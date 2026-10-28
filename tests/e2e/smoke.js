#!/usr/bin/env node
/**
 * Dependency-free smoke test: drives a headless Chrome/Edge over CDP.
 * Verifies loading, rendering, console health and standalone HTML export.
 */
const { spawn } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const root = path.resolve(__dirname, "..", "..");
const indexUrl = "file:///" + path.join(root, "index.html").replace(/\\/g, "/");

function findBrowser() {
  const candidates = [
    process.env.CHROME_PATH,
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"
  ].filter(Boolean);
  return candidates.find((candidate) => fs.existsSync(candidate));
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const browserPath = findBrowser();
  if (!browserPath) throw new Error("No Chrome/Edge found. Set CHROME_PATH.");

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "irs-e2e-"));
  const profileDir = path.join(tempDir, "profile");
  const downloadDir = path.join(tempDir, "downloads");
  fs.mkdirSync(profileDir, { recursive: true });
  fs.mkdirSync(downloadDir, { recursive: true });

  const port = 9400 + Math.floor(Math.random() * 400);
  const browser = spawn(browserPath, [
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--disable-extensions",
    "--no-first-run",
    "--no-default-browser-check",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profileDir}`,
    "--window-size=1440,1100",
    "about:blank"
  ], { stdio: "ignore" });

  let ws;
  try {
    const target = await waitForTarget(port);
    ws = await connect(target.webSocketDebuggerUrl);
    const send = ws.send;
    const events = [];
    ws.onEvent = (event) => events.push(event);

    await send("Runtime.enable");
    await send("Page.enable");
    await send("Log.enable");
    await send("Page.setDownloadBehavior", { behavior: "allow", downloadPath: downloadDir });
    await send("Page.navigate", { url: indexUrl });

    await waitFor(async () => {
      const value = await evaluate(send, "document.querySelectorAll('.resume-section').length");
      return value >= 5;
    }, "app render", 15000);

    const state = await evaluate(send, `(() => ({
      title: document.title,
      sections: document.querySelectorAll('.resume-section').length,
      textLength: document.querySelector('#resumeContent')?.innerText.length || 0,
      avatar: document.querySelector('.photo-frame img')?.getAttribute('src') || '',
      usage: document.querySelector('#pageUsage')?.textContent || ''
    }))()`);

    assert(state.title.includes("简历"), "unexpected title");
    assert(state.sections >= 5, "expected at least 5 sections");
    assert(state.textLength > 200, "resume content did not render");
    assert(state.avatar.startsWith("data:image/svg+xml;base64,"), "demo avatar should be embedded");
    assert(state.usage.length > 0, "page usage indicator missing");

    await evaluate(send, `(() => {
      document.querySelector('#moreButton').click();
      const button = document.querySelector('[data-action="export-html"]');
      if (!button) return false;
      button.click();
      return true;
    })()`);

    const exported = await waitForFile(downloadDir, ".html", 15000);
    const html = fs.readFileSync(exported, "utf8");
    assert(html.includes("data:image/svg+xml;base64,"), "exported HTML should embed the avatar");
    assert(html.includes("</strong>"), "exported HTML should preserve bold closing tags");
    assert(html.includes("@media print"), "exported HTML should include print styles");

    const errors = events.filter((event) =>
      event.method === "Runtime.exceptionThrown" ||
      (event.method === "Log.entryAdded" && event.params.entry.level === "error") ||
      (event.method === "Runtime.consoleAPICalled" && event.params.type === "error")
    );
    assert(errors.length === 0, `console errors: ${errors.length}`);

    console.log("E2E OK");
    console.log(JSON.stringify({ ...state, exportedBytes: Buffer.byteLength(html) }, null, 2));
  } finally {
    try { ws?.close(); } catch {}
    browser.kill();
    await sleep(300);
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch {}
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function waitForTarget(port) {
  for (let i = 0; i < 80; i += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/list`);
      const list = await response.json();
      const target = list.find((item) => item.type === "page");
      if (target?.webSocketDebuggerUrl) return target;
    } catch {}
    await sleep(200);
  }
  throw new Error("CDP target not available");
}

function connect(url) {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(url);
    const nativeSend = socket.send.bind(socket);
    let nextId = 0;
    const pending = new Map();
    socket.onmessage = (message) => {
      const payload = JSON.parse(message.data);
      if (payload.id && pending.has(payload.id)) {
        const { resolve: ok, reject: fail } = pending.get(payload.id);
        pending.delete(payload.id);
        if (payload.error) fail(new Error(JSON.stringify(payload.error)));
        else ok(payload.result);
      } else if (payload.method) {
        socket.onEvent?.(payload);
      }
    };
    socket.onopen = () => {
      socket.send = (method, params = {}) => new Promise((ok, fail) => {
        const id = ++nextId;
        pending.set(id, { resolve: ok, reject: fail });
        nativeSend(JSON.stringify({ id, method, params }));
      });
      resolve(socket);
    };
    socket.onerror = () => reject(new Error("CDP websocket failed"));
  });
}

async function evaluate(send, expression) {
  const result = await send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true
  });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text || "evaluation failed");
  return result.result.value;
}

async function waitFor(check, label, timeout) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    if (await check()) return;
    await sleep(150);
  }
  throw new Error(`Timed out waiting for ${label}`);
}

async function waitForFile(directory, suffix, timeout) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    const files = fs.readdirSync(directory).filter((name) => name.endsWith(suffix));
    if (files.length) return path.join(directory, files[0]);
    await sleep(150);
  }
  throw new Error(`Timed out waiting for ${suffix} download`);
}

main().catch((error) => {
  console.error("E2E FAILED:", error.message);
  process.exit(1);
});
