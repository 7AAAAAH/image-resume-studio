#!/usr/bin/env node
/**
 * Concatenates src/*.js fragments into the single-file app.js.
 * The output keeps working when index.html is opened directly via file://.
 */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const srcDir = path.join(root, "src");
const outPath = path.join(root, "app.js");
const stylesPath = path.join(root, "styles.css");
const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));

const files = fs
  .readdirSync(srcDir)
  .filter((name) => name.endsWith(".js"))
  .sort();

function withoutPrintRules(css) {
  let output = "";
  let cursor = 0;
  while (true) {
    const start = css.indexOf("@media print", cursor);
    if (start < 0) return output + css.slice(cursor);
    output += css.slice(cursor, start);
    const braceStart = css.indexOf("{", start);
    if (braceStart < 0) return output;
    let depth = 0;
    let end = css.length;
    for (let index = braceStart; index < css.length; index += 1) {
      if (css[index] === "{") depth += 1;
      if (css[index] === "}") {
        depth -= 1;
        if (depth === 0) {
          end = index + 1;
          break;
        }
      }
    }
    cursor = end;
  }
}

if (!files.length) {
  console.error("No source fragments found in src/");
  process.exit(1);
}

const banner = `/*! Image Resume Studio v${pkg.version} | MIT | Generated from src/*.js - do not edit app.js directly. */\n`;
const exportCss = withoutPrintRules(fs.readFileSync(stylesPath, "utf8"));
const cssFragment = `const EXPORT_CSS = ${JSON.stringify(exportCss)};\n`;
const code = banner + cssFragment + files.map((name) => fs.readFileSync(path.join(srcDir, name), "utf8")).join("\n");

if (process.argv.includes("--check")) {
  const current = fs.existsSync(outPath) ? fs.readFileSync(outPath, "utf8") : "";
  if (current !== code) {
    console.error("app.js is out of date. Run `npm run build` and commit the result.");
    process.exit(1);
  }
  console.log("app.js is up to date.");
  process.exit(0);
}

fs.writeFileSync(outPath, code, "utf8");
console.log(`Built app.js (${Buffer.byteLength(code)} bytes) from ${files.length} fragments + styles.css.`);
