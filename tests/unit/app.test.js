const test = require("node:test");
const assert = require("node:assert/strict");
const { loadApp } = require("./helpers");

const app = loadApp();

test("normalizeData keeps defaults when partial data is imported", () => {
  const data = app.normalizeData({ basics: { name: "测试用户" } });
  assert.equal(data.basics.name, "测试用户");
  assert.equal(data.basics.email, app.DEFAULT_DATA.basics.email);
  assert.equal(data.basics.phone, app.DEFAULT_DATA.basics.phone);
  assert.ok(Array.isArray(data.summary.bullets));
  assert.ok(Array.isArray(data.experience));
});

test("normalizeData clamps density and rejects unknown templates", () => {
  assert.equal(app.normalizeData({ density: 999 }).density, 112);
  assert.equal(app.normalizeData({ density: 10 }).density, 80);
  assert.equal(app.normalizeData({ template: "not-a-template" }).template, "classic");
});

test("parseResumeText extracts contact details and sections", () => {
  const text = [
    "张三",
    "高级产品经理",
    "电话：13800138000",
    "邮箱：zhangsan@example.com",
    "个人总结",
    "8 年 B 端产品经验，擅长从 0 到 1。",
    "工作经历",
    "星澜科技 | 2021-06 - 至今",
    "负责企业知识库产品规划",
    "项目经历",
    "知识库 2.0 | 2023-03 - 2024-12",
    "主导搜索与权限重构",
    "教育经历",
    "华东理工大学 | 2015-09 - 2019-06",
    "信息管理与信息系统",
    "技能",
    "产品规划：路线图与需求分析",
    "数据分析：SQL 与埋点"
  ].join("\n");

  const parsed = app.parseResumeText(text);
  assert.equal(parsed.basics.name, "张三");
  assert.equal(parsed.basics.phone, "13800138000");
  assert.equal(parsed.basics.email, "zhangsan@example.com");
  assert.equal(parsed.summary.lead, "8 年 B 端产品经验，擅长从 0 到 1。");
  assert.equal(parsed.experience.length, 1);
  assert.equal(parsed.experience[0].org, "星澜科技");
  assert.equal(parsed.experience[0].date, "2021-06 - 至今");
  assert.equal(parsed.education[0].org, "华东理工大学");
  assert.equal(parsed.skills.length, 2);
});

test("parseResumeText returns null for too little text", () => {
  assert.equal(app.parseResumeText("只有一行"), null);
});

test("cleanOcrText trims noise and blank lines", () => {
  const result = app.cleanOcrText("  张三  \r\n\r\n  138  0013 8000\n下载无水印");
  assert.equal(result, "张三\n138 0013 8000");
});

test("stripOcrBullet removes bullets and leading punctuation", () => {
  assert.equal(app.stripOcrBullet("• 负责产品规划"), "负责产品规划");
  assert.equal(app.stripOcrBullet("。测试内容"), "测试内容");
});

test("markdown and rich text helpers round-trip bold text", () => {
  assert.equal(app.markdownToRich("**重点**"), "<strong>重点</strong>");
  assert.equal(app.richToMarkdown("<strong>重点</strong>"), "**重点**");
  assert.equal(app.markdownToRich("普通文本"), "普通文本");
});

test("escapeHtml and safeRich only allow bold tags", () => {
  assert.equal(app.escapeHtml("<a>"), "&lt;a&gt;");
  assert.equal(app.safeRich("<strong>ok</strong><script>x</script>"), "<strong>ok</strong>x");
  assert.equal(app.safeRich("<em>no</em>"), "no");
});

test("getPath and setPath work with nested paths", () => {
  const obj = { basics: { name: "A" } };
  assert.equal(app.getPath(obj, "basics.name"), "A");
  app.setPath(obj, "basics.name", "B");
  assert.equal(obj.basics.name, "B");
  app.setPath(obj, "summary.lead", "hello");
  assert.equal(obj.summary.lead, "hello");
});

test("classifyLayoutSignals detects rounded hero headers", () => {
  const result = app.classifyLayoutSignals({
    aspect: 1.414,
    headerRatio: 0.24,
    cornerGap: 0.18,
    leftTint: 0,
    rightTint: 0
  });
  assert.equal(result.template, "classic");
  assert.equal(result.shape, "rounded");
  assert.equal(result.density, 96);
  assert.ok(result.confidence >= 0.6);
});

test("classifyLayoutSignals detects straight and minimal layouts", () => {
  const straight = app.classifyLayoutSignals({
    aspect: 1.414,
    headerRatio: 0.3,
    cornerGap: 0,
    leftTint: 0,
    rightTint: 0
  });
  assert.equal(straight.shape, "straight");
  assert.equal(straight.density, 88);

  const minimal = app.classifyLayoutSignals({
    aspect: 1.414,
    headerRatio: 0.06,
    cornerGap: 0,
    leftTint: 0,
    rightTint: 0
  });
  assert.equal(minimal.template, "minimal");
  assert.equal(minimal.density, 100);
});

test("classifyLayoutSignals detects a tinted sidebar column", () => {
  const result = app.classifyLayoutSignals({
    aspect: 1.414,
    headerRatio: 0.2,
    cornerGap: 0,
    leftTint: 0.03,
    rightTint: 0.34
  });
  assert.equal(result.template, "sidebar");
  assert.ok(result.confidence <= 0.9);
});

test("normalizeTemplate fills defaults and clamps invalid values", () => {
  const empty = app.normalizeTemplate({});
  assert.equal(empty.version, 1);
  assert.equal(empty.page.margin, "standard");
  assert.equal(empty.theme.accent, "#2563eb");
  assert.equal(empty.theme.headerShape, "rounded");
  assert.equal(empty.theme.density, 96);
  assert.equal(empty.layout.template, "classic");

  const clamped = app.normalizeTemplate({
    theme: { accent: "red", headerShape: "nope", density: 999, showPhoto: false },
    layout: { template: "nope" }
  });
  assert.equal(clamped.theme.accent, "#2563eb");
  assert.equal(clamped.theme.headerShape, "rounded");
  assert.equal(clamped.theme.density, 112);
  assert.equal(clamped.theme.showPhoto, false);
  assert.equal(clamped.layout.template, "classic");
});

test("templateFromState exports a reusable style without resume content", () => {
  const template = app.templateFromState({
    template: "sidebar",
    accent: "#0c7b74",
    headerShape: "straight",
    density: 88,
    margin: "compact",
    showPhoto: false
  });
  assert.equal(template.layout.template, "sidebar");
  assert.equal(template.theme.accent, "#0c7b74");
  assert.equal(template.theme.headerShape, "straight");
  assert.equal(template.theme.density, 88);
  assert.equal(template.page.margin, "compact");
  assert.equal(template.theme.showPhoto, false);
  assert.ok(template.name.includes("左侧信息栏"));
  assert.equal(Object.prototype.hasOwnProperty.call(template, "basics"), false);
});

test("AI settings default to a safe, non-persistent OpenAI configuration", () => {
  const defaults = app.defaultAiSettings();
  assert.equal(defaults.provider, "openai");
  assert.equal(defaults.base, "");
  assert.equal(defaults.model, "");
  assert.equal(defaults.apiKey, "");
  assert.equal(defaults.remember, false);

  const resolved = app.resolvedAiSettings(defaults);
  assert.equal(resolved.base, "https://api.openai.com/v1");
  assert.equal(resolved.model, "gpt-4.1-mini");
});

test("aiRequestFor builds OpenAI-compatible vision payloads", () => {
  const request = app.aiRequestFor("openai", {
    base: "https://api.example.com/v1/",
    model: "vision-model",
    apiKey: "test-key"
  }, "data:image/png;base64,AAAA");

  assert.equal(request.url, "https://api.example.com/v1/chat/completions");
  assert.equal(request.headers.Authorization, "Bearer test-key");
  assert.equal(request.body.model, "vision-model");
  assert.equal(request.body.messages[0].content[1].image_url.url, "data:image/png;base64,AAAA");
  assert.match(request.body.messages[0].content[0].text, /只输出严格 JSON/);
});

test("aiRequestFor builds Anthropic vision payloads", () => {
  const request = app.aiRequestFor("anthropic", {
    base: "https://api.anthropic.com/v1",
    model: "claude-test",
    apiKey: "anthropic-key"
  }, "data:image/jpeg;base64,BBBB");

  assert.equal(request.url, "https://api.anthropic.com/v1/messages");
  assert.equal(request.headers["x-api-key"], "anthropic-key");
  assert.equal(request.headers["anthropic-dangerous-direct-browser-access"], "true");
  assert.equal(request.body.messages[0].content[0].source.media_type, "image/jpeg");
  assert.equal(request.body.messages[0].content[0].source.data, "BBBB");
});

test("extractJsonObject tolerates fenced output and rejects malformed text", () => {
  assert.deepEqual(
    app.extractJsonObject('模型说明：\\n```json\\n{"layout":{"template":"sidebar"}}\\n```\\n完成'),
    { layout: { template: "sidebar" } }
  );
  assert.deepEqual(
    app.extractJsonObject('prefix {"theme":{"density":88}} suffix'),
    { theme: { density: 88 } }
  );
  assert.equal(app.extractJsonObject("not json"), null);
  assert.equal(app.extractJsonObject('{"broken":'), null);
});
