// Fragment 60: reusable template DSL import/export.
  const TEMPLATE_VERSION = 1;
  const TEMPLATE_MARGINS = ["compact", "standard", "airy"];
  const HEADER_SHAPES = ["rounded", "straight", "arch"];
  const WORK_CARD_STYLES = ["dashed", "soft", "none"];
  const TEMPLATE_IDS = PRESETS.map(preset => preset.id);

  function normalizeDensity(value) {
    if (value === undefined || value === null || value === "") return 96;
    const number = Number(value);
    if (!Number.isFinite(number)) return 96;
    return Math.min(112, Math.max(80, Math.round(number)));
  }

  function boundedNumber(value, min, max, fallback, digits = 0) {
    const number = Number(value);
    if (!Number.isFinite(number)) return fallback;
    const factor = 10 ** digits;
    return Math.min(max, Math.max(min, Math.round(number * factor) / factor));
  }

  function normalizeTemplate(input) {
    const data = input && typeof input === "object" ? input : {};
    const theme = data.theme && typeof data.theme === "object" ? data.theme : {};
    const page = data.page && typeof data.page === "object" ? data.page : {};
    const layout = data.layout && typeof data.layout === "object" ? data.layout : {};

    const template = TEMPLATE_IDS.includes(layout.template)
      ? layout.template
      : TEMPLATE_IDS.includes(data.template) ? data.template : "classic";
    const headerShape = HEADER_SHAPES.includes(theme.headerShape)
      ? theme.headerShape
      : HEADER_SHAPES.includes(data.headerShape) ? data.headerShape : "rounded";
    const margin = TEMPLATE_MARGINS.includes(page.margin)
      ? page.margin
      : TEMPLATE_MARGINS.includes(data.margin) ? data.margin : "standard";
    const accentValue = typeof (theme.accent || data.accent) === "string" ? (theme.accent || data.accent) : "";
    const accent = /^#[0-9a-f]{6}$/i.test(accentValue) ? accentValue.toLowerCase() : "#2563eb";
    const showPhoto = (theme.showPhoto ?? data.showPhoto) !== false;
    const headerHeight = boundedNumber(theme.headerHeight ?? data.headerHeight, 145, 235, 177);
    const radius = boundedNumber(theme.radius ?? data.radius, 0, 58, 34);
    const cardRadius = boundedNumber(theme.cardRadius ?? data.cardRadius, 0, 32, 15);
    const sectionGap = boundedNumber(theme.sectionGap ?? data.sectionGap, 14, 46, 34);
    const lineHeight = boundedNumber(theme.lineHeight ?? data.lineHeight, 1.32, 1.82, 1.6, 2);
    const workCardStyle = WORK_CARD_STYLES.includes(theme.workCardStyle)
      ? theme.workCardStyle
      : WORK_CARD_STYLES.includes(data.workCardStyle) ? data.workCardStyle : "dashed";

    return {
      version: TEMPLATE_VERSION,
      name: String(data.name || "导入的模板").slice(0, 60),
      page: { size: "A4", margin },
      theme: {
        accent,
        headerShape,
        density: normalizeDensity(theme.density ?? data.density),
        showPhoto,
        headerHeight,
        radius,
        cardRadius,
        sectionGap,
        lineHeight,
        workCardStyle
      },
      layout: { template }
    };
  }

  function templateFromState(source = state) {
    const templateName = LAYOUT_TEMPLATE_NAMES[source.template] || "自定义版式";
    const shapeName = source.headerShape === "rounded"
      ? "圆角头部"
      : source.headerShape === "arch" ? "拱形头部" : "直角头部";
    return normalizeTemplate({
      version: TEMPLATE_VERSION,
      name: `${templateName} · ${shapeName}`,
      page: { size: "A4", margin: source.margin },
      theme: {
        accent: source.accent,
        headerShape: source.headerShape,
        density: source.density,
        showPhoto: source.showPhoto,
        headerHeight: source.headerHeight,
        radius: source.radius,
        cardRadius: source.cardRadius,
        sectionGap: source.sectionGap,
        lineHeight: source.lineHeight,
        workCardStyle: source.workCardStyle
      },
      layout: { template: source.template }
    });
  }

  function applyTemplate(input) {
    const template = normalizeTemplate(input);
    state.template = template.layout.template;
    state.headerShape = template.theme.headerShape;
    state.density = template.theme.density;
    state.margin = template.page.margin;
    state.accent = template.theme.accent;
    state.showPhoto = template.theme.showPhoto;
    state.headerHeight = template.theme.headerHeight;
    state.radius = template.theme.radius;
    state.cardRadius = template.theme.cardRadius;
    state.sectionGap = template.theme.sectionGap;
    state.lineHeight = template.theme.lineHeight;
    state.workCardStyle = template.theme.workCardStyle;
    renderPreview();
    updateStyleControls();
    saveState();
    return template;
  }

  function exportTemplate() {
    const template = templateFromState();
    const safeName = template.name.replace(/[\\/:*?"<>|]/g, "-");
    downloadBlob(
      new Blob([JSON.stringify(template, null, 2)], { type: "application/json" }),
      `${safeName}.resume-template.json`
    );
    toast("已导出模板");
  }

  async function importTemplateFile(file) {
    try {
      const parsed = JSON.parse(await readFileAsText(file));
      const template = applyTemplate(parsed);
      toast(`已应用模板：${template.name}`);
    } catch {
      toast("模板文件格式不正确");
    }
  }
