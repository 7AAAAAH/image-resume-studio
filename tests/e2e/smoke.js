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
const indexUrl = process.env.E2E_URL ||
  "file:///" + path.join(root, "index.html").replace(/\\/g, "/") + "?test=1";

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

    const aiSettings = await evaluate(send, `(() => {
      window.__aiFetchCalls = 0;
      const originalFetch = window.fetch.bind(window);
      window.fetch = (...args) => {
        window.__aiFetchCalls += 1;
        return originalFetch(...args);
      };
      document.querySelector('#moreButton').click();
      document.querySelector('[data-action="ai-settings"]').click();
      const modal = document.querySelector('#aiModal');
      const defaults = {
        open: !modal.hidden,
        provider: document.querySelector('#aiProvider').value,
        basePlaceholder: document.querySelector('#aiBase').placeholder,
        modelPlaceholder: document.querySelector('#aiModel').placeholder,
        hint: document.querySelector('#aiProviderHint').textContent
      };
      const provider = document.querySelector('#aiProvider');
      provider.value = 'anthropic';
      provider.dispatchEvent(new Event('change', { bubbles: true }));
      const anthropic = {
        basePlaceholder: document.querySelector('#aiBase').placeholder,
        modelPlaceholder: document.querySelector('#aiModel').placeholder,
        hint: document.querySelector('#aiProviderHint').textContent
      };
      provider.value = 'compatible';
      provider.dispatchEvent(new Event('change', { bubbles: true }));
      const compatible = {
        basePlaceholder: document.querySelector('#aiBase').placeholder,
        hint: document.querySelector('#aiProviderHint').textContent
      };
      modal.hidden = true;
      document.querySelector('#aiAnalyzeButton').click();
      const noKey = {
        modalReopened: !document.querySelector('#aiModal').hidden,
        fetchCalls: window.__aiFetchCalls
      };
      document.querySelector('#aiModal').hidden = true;
      return { defaults, anthropic, compatible, noKey };
    })()`);
    assert(aiSettings.defaults.open, "AI settings modal did not open");
    assert(aiSettings.defaults.provider === "openai", "unexpected default AI provider");
    assert(aiSettings.defaults.basePlaceholder.includes("api.openai.com"), "OpenAI base placeholder missing");
    assert(aiSettings.anthropic.modelPlaceholder.includes("claude"), "Claude model placeholder missing");
    assert(aiSettings.compatible.basePlaceholder.includes("your-endpoint"), "compatible endpoint hint missing");
    assert(aiSettings.noKey.modalReopened, "missing API key should reopen settings");
    assert(aiSettings.noKey.fetchCalls === 0, "missing API key must not make a network call");

    const tokenRoundTrip = await evaluate(send, `(async () => {
      const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
      const setRange = (selector, value) => {
        const input = document.querySelector(selector);
        input.value = value;
        input.dispatchEvent(new Event('input', { bubbles: true }));
      };
      setRange('#headerHeightRange', 210);
      setRange('#cardRadiusRange', 24);
      const card = document.querySelector('#workCardStyle');
      card.value = 'soft';
      card.dispatchEvent(new Event('change', { bubbles: true }));
      await wait(260);
      const changed = {
        headerHeight: document.querySelector('#resumePage').style.getPropertyValue('--header-height').trim(),
        cardRadius: document.querySelector('#resumePage').style.getPropertyValue('--card-radius').trim(),
        workCard: document.querySelector('#resumePage').dataset.workCard,
        undoEnabled: !document.querySelector('#undoButton').disabled
      };
      document.querySelector('#undoButton').click();
      await wait(180);
      const undone = {
        headerHeight: document.querySelector('#headerHeightRange').value,
        cardRadius: document.querySelector('#cardRadiusRange').value,
        workCard: document.querySelector('#workCardStyle').value,
        redoEnabled: !document.querySelector('#redoButton').disabled
      };
      document.querySelector('#redoButton').click();
      await wait(180);
      const redone = {
        headerHeight: document.querySelector('#headerHeightRange').value,
        cardRadius: document.querySelector('#cardRadiusRange').value,
        workCard: document.querySelector('#workCardStyle').value
      };
      return { changed, undone, redone };
    })()`);
    assert(tokenRoundTrip.changed.headerHeight === "210px", "header-height token was not applied");
    assert(tokenRoundTrip.changed.cardRadius === "24px", "card-radius token was not applied");
    assert(tokenRoundTrip.changed.workCard === "soft", "work-card style was not applied");
    assert(tokenRoundTrip.changed.undoEnabled, "undo should be enabled after a change");
    assert(tokenRoundTrip.undone.headerHeight === "177", "undo did not restore header height");
    assert(tokenRoundTrip.undone.cardRadius === "15", "undo did not restore card radius");
    assert(tokenRoundTrip.undone.workCard === "dashed", "undo did not restore work-card style");
    assert(tokenRoundTrip.undone.redoEnabled, "redo should be enabled after undo");
    assert(tokenRoundTrip.redone.headerHeight === "210", "redo did not restore header height");
    assert(tokenRoundTrip.redone.cardRadius === "24", "redo did not restore card radius");
    assert(tokenRoundTrip.redone.workCard === "soft", "redo did not restore work-card style");

    const layout = await evaluate(send, `(async () => {
      async function make(kind) {
        const canvas = document.createElement("canvas");
        canvas.width = 600;
        canvas.height = 850;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, 600, 850);
        const headerHeight = kind === "minimal" ? 56 : kind === "straight" ? 260 : 220;
        ctx.fillStyle = "#2563eb";
        if (kind === "rounded") {
          const radius = 110;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(600, 0);
          ctx.lineTo(600, headerHeight - radius);
          ctx.quadraticCurveTo(600, headerHeight, 600 - radius, headerHeight);
          ctx.lineTo(0, headerHeight);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.fillRect(0, 0, 600, headerHeight);
        }
        ctx.fillStyle = "#333333";
        for (let y = headerHeight + 40; y < 820; y += 26) {
          ctx.fillRect(40, y, 250 + (y % 140), 7);
        }
        if (kind === "sidebar") {
          ctx.fillStyle = "#eef3fb";
          ctx.fillRect(450, headerHeight + 20, 150, 780 - headerHeight);
        }
        const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
        return new File([blob], kind + ".png", { type: "image/png" });
      }
      const result = {};
      for (const kind of ["rounded", "straight", "minimal", "sidebar"]) {
        const file = await make(kind);
        const analysis = await window.__RS_TEST__.analyzeImage(file);
        result[kind] = {
          template: analysis.features.template,
          shape: analysis.features.shape,
          density: analysis.features.density,
          confidence: analysis.features.confidence,
          signals: analysis.features.signals
        };
      }
      return result;
    })()`);

    console.log("LAYOUT_DEBUG " + JSON.stringify(layout));
    assert(layout.rounded.shape === "rounded", "rounded header was not detected");
    assert(layout.rounded.template === "classic", "rounded header should use classic layout");
    assert(layout.straight.shape === "straight", "straight header was not detected");
    assert(layout.minimal.template === "minimal", "minimal layout was not detected");
    assert(layout.sidebar.template === "sidebar", "sidebar layout was not detected");
    for (const [kind, item] of Object.entries(layout)) {
      assert(item.confidence > 0.25, `layout confidence too low for ${kind}`);
    }

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
    assert(html.includes("--header-height"), "exported HTML should include design-token styles");
    assert(html.includes('data-work-card="soft"'), "exported HTML should preserve the card variant");
    assert(html.includes('.resume-page[data-template="classic"] .section-experience'), "exported HTML should include current template styles");
    assert(Buffer.byteLength(html) > 30000, "exported HTML stylesheet appears incomplete");

    await evaluate(send, `(() => {
      document.querySelector('#moreButton').click();
      document.querySelector('[data-action="export-template"]').click();
      return true;
    })()`);
    const templateFile = await waitForFile(downloadDir, ".resume-template.json", 15000);
    const template = JSON.parse(fs.readFileSync(templateFile, "utf8"));
    assert(template.version === 1, "template version missing");
    assert(template.layout.template, "template layout missing");
    assert(/^#[0-9a-f]{6}$/i.test(template.theme.accent), "template accent invalid");
    assert(template.theme.headerHeight === 210, "design token missing from exported template");
    assert(template.theme.workCardStyle === "soft", "card style missing from exported template");

    await evaluate(send, `(() => {
      const tpl = {
        version: 1,
        name: "E2E 模板",
        page: { size: "A4", margin: "compact" },
        theme: {
          accent: "#0c7b74",
          headerShape: "straight",
          density: 88,
          showPhoto: false,
          headerHeight: 205,
          radius: 20,
          cardRadius: 8,
          sectionGap: 26,
          lineHeight: 1.5,
          workCardStyle: "soft"
        },
        layout: { template: "sidebar" }
      };
      const input = document.querySelector('#templateInput');
      const transfer = new DataTransfer();
      transfer.items.add(new File([JSON.stringify(tpl)], "e2e.resume-template.json", { type: "application/json" }));
      input.files = transfer.files;
      input.dispatchEvent(new Event("change", { bubbles: true }));
      return true;
    })()`);
    await sleep(600);
    const applied = await evaluate(send, `(() => ({
      accent: document.querySelector('#accentColor').value,
      shape: document.querySelector('#headerShape').value,
      density: document.querySelector('#densityRange').value,
      margin: document.querySelector('#pageMargin').value,
      showPhoto: document.querySelector('#showPhoto').checked,
      template: document.querySelector('#resumePage').dataset.template,
      headerHeight: document.querySelector('#headerHeightRange').value,
      radius: document.querySelector('#radiusRange').value,
      cardRadius: document.querySelector('#cardRadiusRange').value,
      sectionGap: document.querySelector('#sectionGapRange').value,
      lineHeight: document.querySelector('#lineHeightRange').value,
      workCard: document.querySelector('#resumePage').dataset.workCard
    }))()`);
    assert(applied.accent === "#0c7b74", "template accent was not applied");
    assert(applied.shape === "straight", "template header shape was not applied");
    assert(applied.density === "88", "template density was not applied");
    assert(applied.margin === "compact", "template margin was not applied");
    assert(applied.showPhoto === false, "template photo setting was not applied");
    assert(applied.template === "sidebar", "template layout was not applied");
    assert(applied.headerHeight === "205", "template header height was not applied");
    assert(applied.radius === "20", "template header radius was not applied");
    assert(applied.cardRadius === "8", "template card radius was not applied");
    assert(applied.sectionGap === "26", "template section gap was not applied");
    assert(applied.lineHeight === "1.5", "template line height was not applied");
    assert(applied.workCard === "soft", "template work-card style was not applied");

    const errors = events.filter((event) =>
      event.method === "Runtime.exceptionThrown" ||
      (event.method === "Log.entryAdded" && event.params.entry.level === "error") ||
      (event.method === "Runtime.consoleAPICalled" && event.params.type === "error")
    );
    assert(errors.length === 0, `console errors: ${errors.length}`);

    console.log("E2E OK");
    console.log(JSON.stringify({ ...state, aiSettings, tokenRoundTrip, layout, template, applied, exportedBytes: Buffer.byteLength(html) }, null, 2));
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
