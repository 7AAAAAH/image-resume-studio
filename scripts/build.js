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
const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));

const files = fs
  .readdirSync(srcDir)
  .filter((name) => name.endsWith(".js"))
  .sort();

if (!files.length) {
  console.error("No source fragments found in src/");
  process.exit(1);
}

const banner = `/*! Image Resume Studio v${pkg.version} | MIT | Generated from src/*.js - do not edit app.js directly. */\n`;
const code = banner + files.map((name) => fs.readFileSync(path.join(srcDir, name), "utf8")).join("\n");

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
console.log(`Built app.js (${Buffer.byteLength(code)} bytes) from ${files.length} fragments.`);