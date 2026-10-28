// Fragment 70: optional BYOK vision model adapter for layout analysis.
  const AI_SETTINGS_KEY = "resume-studio-ai-v1";
  const AI_PROVIDERS = {
    openai: {
      label: "OpenAI",
      adapter: "openai",
      defaultBase: "https://api.openai.com/v1",
      defaultModel: "gpt-4.1-mini"
    },
    compatible: {
      label: "OpenAI 兼容（Qwen / GLM / 自定义）",
      adapter: "openai",
      defaultBase: "",
      defaultModel: ""
    },
    anthropic: {
      label: "Anthropic Claude",
      adapter: "anthropic",
      defaultBase: "https://api.anthropic.com/v1",
      defaultModel: "claude-sonnet-4-5"
    }
  };

  let aiSessionSettings = null;

  function defaultAiSettings() {
    return { provider: "openai", base: "", model: "", apiKey: "", remember: false };
  }

  function loadAiSettings() {
    if (aiSessionSettings) return { ...aiSessionSettings };
    try {
      const raw = localStorage.getItem(AI_SETTINGS_KEY);
      if (raw) return { ...defaultAiSettings(), ...JSON.parse(raw) };
    } catch {
      // Storage can be unavailable in private mode; fall back to defaults.
    }
    return defaultAiSettings();
  }

  function persistAiSettings(settings) {
    aiSessionSettings = { ...settings };
    try {
      if (settings.remember && settings.apiKey) localStorage.setItem(AI_SETTINGS_KEY, JSON.stringify(settings));
      else localStorage.removeItem(AI_SETTINGS_KEY);
    } catch {
      // Ignore quota/private-mode errors; the key remains in memory for this session.
    }
  }

  function resolvedAiSettings(settings = loadAiSettings()) {
    const provider = AI_PROVIDERS[settings.provider] ? settings.provider : "openai";
    const meta = AI_PROVIDERS[provider];
    return {
      ...settings,
      provider,
      base: String(settings.base || meta.defaultBase || "").replace(/\/+$/, ""),
      model: String(settings.model || meta.defaultModel || "").trim(),
      apiKey: String(settings.apiKey || "").trim()
    };
  }

  function buildVisionPrompt() {
    return [
      "你是一名资深简历版式分析师。请只分析这张简历截图的视觉版式，不要复述或提取任何个人隐私内容。",
      "",
      "请从以下固定选项中选择最接近的一项：",
      "- layout.template: classic（顶部色块 + 单栏）、sidebar（顶部头部 + 侧栏）、editorial（浅色头部 + 编辑感留白）、minimal（白底 + 细线标题）",
      "- theme.headerShape: rounded（头部卡片右下角圆角）、straight（直角）、arch（拱形）",
      "- theme.density: 80-112 的整数，版面越紧凑数值越小",
      "- theme.headerHeight: 头部视觉高度，145-235 的整数",
      "- theme.radius: 头部大圆角，0-58 的整数",
      "- theme.cardRadius: 简历卡片圆角，0-32 的整数",
      "- theme.sectionGap: 栏目标题之间的间距，14-46 的整数",
      "- theme.lineHeight: 正文行高，1.32-1.82",
      "- theme.workCardStyle: dashed（虚线卡片）、soft（柔光卡片）、none（无卡片）",
      "- page.margin: compact / standard / airy",
      "- theme.showPhoto: 是否有证件照",
      "- theme.accent: 主色的十六进制值",
      "",
      "只输出严格 JSON，不要 Markdown，不要解释：",
      '{"version":1,"name":"简短模板名","page":{"size":"A4","margin":"standard"},"theme":{"accent":"#2563eb","headerShape":"rounded","density":96,"showPhoto":true,"headerHeight":177,"radius":34,"cardRadius":15,"sectionGap":34,"lineHeight":1.6,"workCardStyle":"dashed"},"layout":{"template":"classic"}}'
    ].join("\n");
  }

  function aiRequestFor(providerId, settings, imageDataUrl) {
    const meta = AI_PROVIDERS[providerId];
    if (!meta) throw new Error("未知的 AI 服务商");
    const base = String(settings.base || "").replace(/\/+$/, "");
    if (!base) throw new Error("请填写 Base URL");
    if (!settings.model) throw new Error("请填写模型名称");
    if (!settings.apiKey) throw new Error("请填写 API Key");

    if (meta.adapter === "anthropic") {
      const match = /^data:([^;]+);base64,(.+)$/.exec(imageDataUrl);
      if (!match) throw new Error("图片格式不受支持");
      return {
        url: `${base}/messages`,
        headers: {
          "Content-Type": "application/json",
          "x-api-key": settings.apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body: {
          model: settings.model,
          max_tokens: 1200,
          temperature: 0,
          messages: [{
            role: "user",
            content: [
              { type: "image", source: { type: "base64", media_type: match[1], data: match[2] } },
              { type: "text", text: buildVisionPrompt() }
            ]
          }]
        }
      };
    }

    return {
      url: `${base}/chat/completions`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${settings.apiKey}`
      },
      body: {
        model: settings.model,
        temperature: 0,
        max_tokens: 900,
        messages: [{
          role: "user",
          content: [
            { type: "text", text: buildVisionPrompt() },
            { type: "image_url", image_url: { url: imageDataUrl, detail: "high" } }
          ]
        }]
      }
    };
  }

  function extractJsonObject(text) {
    if (!text) return null;
    const source = String(text);
    const fenced = source.match(/```(?:json)?\s*([\s\S]*?)```/i);
    const candidate = fenced ? fenced[1] : source;
    const start = candidate.indexOf("{");
    const end = candidate.lastIndexOf("}");
    if (start < 0 || end <= start) return null;
    try {
      return JSON.parse(candidate.slice(start, end + 1));
    } catch {
      return null;
    }
  }

  async function analyzeLayoutWithAi(imageDataUrl, rawSettings = loadAiSettings()) {
    const settings = resolvedAiSettings(rawSettings);
    const request = aiRequestFor(settings.provider, settings, imageDataUrl);
    const response = await fetch(request.url, {
      method: "POST",
      headers: request.headers,
      body: JSON.stringify(request.body)
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      throw new Error(`服务返回 ${response.status}${detail ? `：${detail.slice(0, 160)}` : ""}`);
    }
    const data = await response.json();
    const text = AI_PROVIDERS[settings.provider].adapter === "anthropic"
      ? (data.content || []).map(part => part.text || "").join("")
      : data.choices?.[0]?.message?.content || "";
    const parsed = extractJsonObject(text);
    if (!parsed) throw new Error("模型没有返回可解析的 JSON");
    return normalizeTemplate(parsed);
  }

  function updateAiPlaceholders() {
    const meta = AI_PROVIDERS[$("#aiProvider").value] || AI_PROVIDERS.openai;
    $("#aiBase").placeholder = meta.defaultBase || "https://your-endpoint/v1";
    $("#aiModel").placeholder = meta.defaultModel || "模型名称";
    $("#aiProviderHint").textContent = meta.adapter === "anthropic"
      ? "Claude 会通过官方 Messages API 接收图片。"
      : "OpenAI 兼容接口：Base URL 通常以 /v1 结尾，模型需支持图片输入。";
  }

  function openAiSettings() {
    const settings = loadAiSettings();
    $("#aiProvider").value = settings.provider;
    $("#aiBase").value = settings.base;
    $("#aiModel").value = settings.model;
    $("#aiKey").value = settings.apiKey;
    $("#aiRemember").checked = settings.remember;
    updateAiPlaceholders();
    $("#aiModal").hidden = false;
  }

  function saveAiSettingsFromForm() {
    const settings = {
      provider: $("#aiProvider").value,
      base: $("#aiBase").value.trim(),
      model: $("#aiModel").value.trim(),
      apiKey: $("#aiKey").value.trim(),
      remember: $("#aiRemember").checked
    };
    persistAiSettings(settings);
    $("#aiModal").hidden = true;
    toast(settings.apiKey ? "AI 设置已保存" : "AI 设置已保存（未填写 API Key）");
  }

  async function runAiLayoutAnalysis() {
    const settings = loadAiSettings();
    if (!settings.apiKey) {
      openAiSettings();
      toast("请先配置 AI 服务，再点击 AI 精确解析");
      return;
    }
    if (!importContext.image) {
      toast("请先导入一张简历图片");
      return;
    }
    const button = $("#aiAnalyzeButton");
    if (button) button.disabled = true;
    $("#importStatus").textContent = "AI 正在解析版式，图片将发送到你配置的服务商…";
    try {
      const template = await analyzeLayoutWithAi(importContext.image, settings);
      applyTemplate(template);
      importContext.features = {
        ...(importContext.features || {}),
        template: template.layout.template,
        shape: template.theme.headerShape,
        density: template.theme.density,
        margin: template.page.margin,
        showPhoto: template.theme.showPhoto
      };
      importContext.palette = { ...(importContext.palette || {}), accent: template.theme.accent };
      $("#importStatus").textContent = `AI 已应用：${template.name}`;
      $("#importModal").hidden = true;
      toast("AI 版式已应用，正在继续处理内容");
      await continueImageImport();
    } catch (error) {
      console.warn(error);
      $("#importStatus").textContent = "AI 解析失败，已保留本地解析结果";
      toast(`AI 解析失败：${String(error.message || error).slice(0, 60)}`);
    } finally {
      if (button) button.disabled = false;
    }
  }
