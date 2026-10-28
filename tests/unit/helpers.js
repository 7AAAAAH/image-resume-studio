const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..", "..");
const srcDir = path.join(root, "src");

function loadApp() {
  const files = fs
    .readdirSync(srcDir)
    .filter((name) => name.endsWith(".js"))
    .sort();
  const code = files.map((name) => fs.readFileSync(path.join(srcDir, name), "utf8")).join("\n");
  const exportBlock = `
  module.exports = {
    DEFAULT_DATA,
    PRESETS,
    normalizeData,
    parseResumeText,
    cleanOcrText,
    stripOcrBullet,
    markdownToRich,
    richToMarkdown,
    escapeHtml,
    safeRich,
    getPath,
    setPath,
    classifyLayoutSignals,
    normalizeTemplate,
    templateFromState,
    defaultAiSettings,
    resolvedAiSettings,
    aiRequestFor,
    extractJsonObject,
    buildVisionPrompt
  };
})();`;
  const testCode = code.replace(/\n\s*init\(\);\s*\n\}\)\(\);\s*$/, exportBlock);
  if (testCode === code) throw new Error("Could not replace init() with test exports");

  const sandbox = {
    module: { exports: {} },
    console,
    setTimeout,
    clearTimeout,
    Date,
    Math,
    JSON
  };
  vm.createContext(sandbox);
  vm.runInContext(testCode, sandbox, { filename: "app.test-bundle.js" });
  return sandbox.module.exports;
}

module.exports = { loadApp };
