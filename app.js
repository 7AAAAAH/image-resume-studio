(() => {
  "use strict";

  const DEFAULT_DATA = {
    version: 1,
    template: "classic",
    accent: "#2563eb",
    headerShape: "rounded",
    showPhoto: true,
    density: 96,
    margin: "standard",
    photo: "headshot.svg",
    basics: {
      name: "林一舟",
      role: "产品经理 / B端 SaaS",
      location: "上海 · 徐汇",
      phone: "138-0000-0000",
      email: "demo@example.com",
      status: "在职 · 看机会",
      gender: "男",
      hometown: "浙江杭州",
      political: ""
    },
    summary: {
      lead: "B端 SaaS 产品经理 | 5 年企业协作与数据产品经验，擅长从 0 到 1 落地",
      bullets: [
        "主导企业知识库从 0 到 1 建设，上线 6 个月覆盖 <strong>1,200+ 企业客户</strong>，续费率提升 18%",
        "搭建产品数据看板与埋点体系，推动核心功能周活跃提升 <strong>32%</strong>",
        "熟悉 Axure、Figma、SQL 与 A/B 实验，能独立完成需求分析、方案设计与上线复盘"
      ]
    },
    experience: [
      {
        id: "exp-1",
        org: "星澜科技",
        title: "高级产品经理",
        date: "2021-06 - 至今",
        bullets: [
          "负责企业知识库与协作套件，管理 6 人产品小组，完成年度路线图与版本规划",
          "通过客户访谈与数据洞察重构信息架构，将新用户上手时间从 45 分钟缩短至 18 分钟",
          "推动设计与研发采用双周迭代，版本准时交付率由 72% 提升至 94%"
        ]
      },
      {
        id: "exp-2",
        org: "云图网络",
        title: "产品经理",
        date: "2019-07 - 2021-05",
        bullets: [
          "负责 SaaS 后台权限与工作流模块，支撑 300+ 企业客户的差异化配置需求",
          "设计自助式报表配置器，减少 60% 的定制开发工单",
          "与销售、客服共建客户反馈闭环，季度 NPS 提升 11 分"
        ]
      }
    ],
    projects: [
      {
        id: "proj-1",
        org: "企业知识库 2.0",
        title: "产品负责人",
        date: "2023-03 - 2024-12",
        bullets: [
          "<strong>从 0 到 1：</strong>完成竞品研究、用户分层与产品定位，制定 12 个月路线图并推动 4 个团队协同交付。",
          "<strong>体验升级：</strong>重构搜索与权限模型，Top 20 高频问题的解决率从 61% 提升到 88%。",
          "<strong>商业化：</strong>设计按席位与容量组合的定价方案，首年 ARR 达成目标的 126%。"
        ]
      }
    ],
    education: [
      {
        id: "edu-1",
        org: "华东理工大学",
        title: "信息管理与信息系统",
        date: "2015-09 - 2019-06",
        right: "本科",
        bullets: [
          "主修课程：数据库原理、管理信息系统、统计学、人机交互",
          "校级一等奖学金；全国大学生数学建模竞赛省级二等奖",
          "担任学生会信息部部长，负责活动报名系统与数据统计"
        ]
      }
    ],
    skills: [
      { name: "产品规划", level: 4, desc: "需求分析，路线图，版本管理" },
      { name: "数据分析", level: 4, desc: "SQL，埋点，A/B 实验" },
      { name: "跨团队协作", level: 4, desc: "设计，研发，销售协同" }
    ],
    custom: [
      { id: "custom-1", title: "认证与语言", date: "2022", content: "PMP 项目管理认证；英语 CET-6，可进行日常商务沟通" }
    ]
  };

  const STORAGE_KEY = "resume-studio-data-v1";
  const PHOTO_KEY = "resume-studio-photo-v1";
  const PRESETS = [
    { id: "classic", name: "蓝白经典", accent: "#1f67ed", shape: "rounded" },
    { id: "sidebar", name: "左侧信息栏", accent: "#2765d3", shape: "straight" },
    { id: "editorial", name: "编辑感留白", accent: "#9a6738", shape: "straight" },
    { id: "minimal", name: "极简线条", accent: "#253e4b", shape: "straight" }
  ];
  const ACCENT_SWATCHES = ["#1f67ed", "#0c7b74", "#a34e34", "#29384d", "#8d6a32", "#5c4ca8"];
  const SECTION_META = [
    { id: "basics", label: "基本信息", icon: "01" },
    { id: "summary", label: "个人总结", icon: "02" },
    { id: "experience", label: "工作经历", icon: "03" },
    { id: "projects", label: "项目经历", icon: "04" },
    { id: "education", label: "教育经历", icon: "05" },
    { id: "skills", label: "技能", icon: "06" },
    { id: "custom", label: "自定义经历", icon: "07" }
  ];

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const clone = (obj) => JSON.parse(JSON.stringify(obj));
  const uid = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const escapeHtml = (str = "") => String(str).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
  const safeRich = (str = "") => String(str)
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/?(?!strong\b|b\b)[^>]+>/gi, "")
    .replace(/<(\/?)(strong|b)>/gi, "<$1strong>");

  let state = loadState();
  let ui = { panel: "content", openGroups: new Set(["basics", "summary"]), zoom: 0.8, fitting: false };
  let importContext = { image: null, palette: null, features: null, text: "" };
  let toastTimer = 0;
  let renderTimer = 0;
  let renderEpoch = 0;

  function normalizeData(input) {
    const base = clone(DEFAULT_DATA);
    const data = Object.assign(base, input || {});
    data.basics = Object.assign(base.basics, input?.basics || {});
    data.summary = Object.assign(base.summary, input?.summary || {});
    data.experience = Array.isArray(input?.experience) ? input.experience : base.experience;
    data.projects = Array.isArray(input?.projects) ? input.projects : base.projects;
    data.education = Array.isArray(input?.education) ? input.education : base.education;
    data.skills = Array.isArray(input?.skills) ? input.skills : base.skills;
    data.custom = Array.isArray(input?.custom) ? input.custom : [];
    if (!PRESETS.some(p => p.id === data.template)) data.template = "classic";
    data.density = Number.isFinite(+data.density) ? Math.min(112, Math.max(80, +data.density)) : 96;
    return data;
  }

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const photo = localStorage.getItem(PHOTO_KEY);
      const data = saved ? normalizeData(JSON.parse(saved)) : clone(DEFAULT_DATA);
      if (photo) data.photo = photo;
      return data;
    } catch {
      return clone(DEFAULT_DATA);
    }
  }

  function saveState(quiet = true) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, photo: "" }));
      if (state.photo) localStorage.setItem(PHOTO_KEY, state.photo);
      else localStorage.removeItem(PHOTO_KEY);
      if (!quiet) toast("已保存到本地浏览器");
    } catch {
      toast("浏览器存储空间不足，请先导出 JSON 备份");
    }
  }

  function scheduleRender() {
    clearTimeout(renderTimer);
    renderTimer = setTimeout(() => {
      renderPreview();
      saveState();
    }, 70);
  }

  function toast(message) {
    const el = $("#toast");
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
  }

  function iconPhotoSvg() {
    return `<div class="photo-placeholder">照</div>`;
  }

  function contactItem(label, value) {
    if (!value) return "";
    return `<div class="contact-item" data-label="${escapeHtml(label)}"><span class="label">${escapeHtml(label)}：</span><span class="value">${escapeHtml(value)}</span></div>`;
  }

  function headerHtml() {
    const b = state.basics;
    const photo = state.showPhoto
      ? `<div class="photo-frame">${state.photo ? `<img src="${state.photo}" alt="${escapeHtml(b.name || "头像")}">` : iconPhotoSvg()}</div>`
      : "";
    return `<header class="resume-header">
      ${photo}
      <div class="header-identity">
        <h2 class="resume-name">${escapeHtml(b.name || "姓名")}</h2>
        <p class="resume-role">${escapeHtml(b.role || "职位 / 方向")}</p>
        <div class="contact-grid">
          ${contactItem("地址", b.location)}
          ${contactItem("电话", b.phone)}
          ${contactItem("邮箱", b.email)}
          ${contactItem("当前状态", b.status)}
        </div>
        <div class="header-extra">
          ${b.gender ? `<span><b>性别：</b>${escapeHtml(b.gender)}</span>` : ""}
          ${b.hometown ? `<span><b>籍贯：</b>${escapeHtml(b.hometown)}</span>` : ""}
          ${b.political ? `<span><b>政治面貌：</b>${escapeHtml(b.political)}</span>` : ""}
        </div>
      </div>
    </header>`;
  }

  function sectionHeading(title, code) {
    return `<div class="section-heading"><span class="section-tab">${escapeHtml(title)}</span><span class="section-heading-line">${escapeHtml(code)}</span></div>`;
  }

  function bulletsHtml(items = []) {
    if (!items.length) return "";
    return `<ul class="bullet-list">${items.filter(Boolean).map(item => `<li>${safeRich(item)}</li>`).join("")}</ul>`;
  }

  function entryHtml(item, kind) {
    if (!item.org && !item.title && !item.bullets?.length) return "";
    const right = item.right || (kind === "education" ? "" : "");
    return `<div class="entry">
      <div class="entry-head">
        <div class="entry-org">${escapeHtml(item.org || "机构名称")}</div>
        ${item.date ? `<div class="entry-date">${escapeHtml(item.date)}</div>` : ""}
      </div>
      ${(item.title || right) ? `<div class="entry-subhead"><span>${escapeHtml(item.title || "")}</span>${right ? `<span class="right">${escapeHtml(right)}</span>` : ""}</div>` : ""}
      ${bulletsHtml(item.bullets || [])}
    </div>`;
  }

  function summaryHtml() {
    if (!state.summary.lead && !state.summary.bullets.some(Boolean)) return "";
    return `<section class="resume-section section-summary">
      ${sectionHeading("个人总结", "PROFILE")}
      ${state.summary.lead ? `<p class="summary-lead">${safeRich(state.summary.lead)}</p>` : ""}
      ${bulletsHtml(state.summary.bullets)}
    </section>`;
  }

  function listSectionHtml(id, title, code, items, kind) {
    if (!items || !items.length) return "";
    return `<section class="resume-section section-${id}">
      ${sectionHeading(title, code)}
      ${items.map(item => entryHtml(item, kind)).join("")}
    </section>`;
  }

  function skillsHtml() {
    if (!state.skills.length) return "";
    return `<section class="resume-section section-skills">
      ${sectionHeading("技能", "EXPERTISE")}
      <div class="skill-grid">
        ${state.skills.map(skill => `<div class="skill-card">
          <div class="skill-name">${escapeHtml(skill.name || "技能名称")}</div>
          <div class="skill-dots">${Array.from({ length: 5 }, (_, i) => `<span class="skill-dot ${i < (+skill.level || 0) ? "on" : ""}"></span>`).join("")}</div>
          <div class="skill-desc">${escapeHtml(skill.desc || "")}</div>
        </div>`).join("")}
      </div>
    </section>`;
  }

  function customHtml() {
    if (!state.custom.length) return "";
    return `<section class="resume-section section-custom">
      ${sectionHeading("其他经历", "ADDITIONAL")}
      ${state.custom.map(item => `<div class="entry">
        <div class="entry-head"><div class="entry-org">${escapeHtml(item.title || "经历标题")}</div>${item.date ? `<div class="entry-date">${escapeHtml(item.date)}</div>` : ""}</div>
        ${item.content ? `<p class="entry-title">${safeRich(item.content)}</p>` : ""}
      </div>`).join("")}
    </section>`;
  }

  function bodyColumns() {
    const experience = listSectionHtml("experience", "工作经历", "EXPERIENCE", state.experience, "experience");
    const projects = listSectionHtml("projects", "项目经历", "SELECTED WORK", state.projects, "projects");
    const education = listSectionHtml("education", "教育经历", "EDUCATION", state.education, "education");
    const skills = skillsHtml();
    const custom = customHtml();
    if (state.template === "sidebar") {
      return `<div class="resume-main">
        <div class="main-column">${summaryHtml()}${experience}${projects}${custom}</div>
        <aside class="side-column">${education}${skills}</aside>
      </div>`;
    }
    return `<div class="resume-main">${summaryHtml()}${experience}${projects}${education}${skills}${custom}</div>`;
  }

  function renderPreview() {
    const page = $("#resumePage");
    const content = $("#resumeContent");
    page.dataset.template = state.template;
    page.className = `resume-page header-${state.headerShape} margin-${state.margin}`;
    page.style.setProperty("--accent", state.accent);
    page.style.setProperty("--accent-soft", mixColor(state.accent, "#ffffff", .9));
    content.style.setProperty("--accent", state.accent);
    content.style.setProperty("--accent-soft", mixColor(state.accent, "#ffffff", .9));
    const scale = state.density / 84;
    content.style.setProperty("--resume-scale", scale);
    content.style.setProperty("--section-gap", `${Math.max(20, 34 * scale)}px`);
    content.style.setProperty("--line-height", `${1.42 + (scale - 1) * .2}`);
    page.style.fontSize = `${scale}px`;
    page.style.padding = "0";
    page.style.setProperty("--page-pad", state.margin);
    content.innerHTML = headerHtml() + bodyColumns();
    applyDensity();
    const epoch = ++renderEpoch;
    requestAnimationFrame(() => {
      if (epoch !== renderEpoch) return;
      updateZoom();
      updateOverflowState();
      updateStyleControls();
    });
  }

  function applyDensity() {
    const page = $("#resumePage");
    const scale = state.density / 90;
    page.style.setProperty("--density", scale);
    const main = $(".resume-main", page);
    if (!main) return;
    main.style.zoom = "";
    const padY = state.margin === "compact" ? 13 : state.margin === "airy" ? 26 : 25;
    const padX = state.margin === "compact" ? 25 : state.margin === "airy" ? 35 : 29;
    main.style.padding = `${Math.round(padY * scale)}px ${Math.round(padX * scale)}px ${Math.round((padY + 2) * scale)}px`;
  }

  function hexToRgb(hex) {
    const h = hex.replace("#", "");
    const n = parseInt(h.length === 3 ? h.split("").map(c => c + c).join("") : h, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }
  function mixColor(a, b, ratio) {
    const ca = hexToRgb(a), cb = hexToRgb(b);
    const to = v => Math.round(v).toString(16).padStart(2, "0");
    return `#${to(ca.r * (1 - ratio) + cb.r * ratio)}${to(ca.g * (1 - ratio) + cb.g * ratio)}${to(ca.b * (1 - ratio) + cb.b * ratio)}`;
  }

  function renderEditor() {
    const root = $("#editorList");
    root.innerHTML = SECTION_META.map(meta => {
      const open = ui.openGroups.has(meta.id);
      const hiddenOnMobile = window.innerWidth <= 760 && !open ? " is-mobile-hidden" : "";
      const count = groupCount(meta.id);
      return `<div class="editor-group ${open ? "is-open" : ""}${hiddenOnMobile}" data-group="${meta.id}">
        <button class="group-head ${open ? "is-current" : ""}" type="button" data-toggle-group="${meta.id}">
          <span class="group-icon">${meta.icon}</span><span>${meta.label}</span><span class="group-count">${count}</span><span class="group-chevron">⌄</span>
        </button>
        <div class="group-body">${groupEditorHtml(meta.id)}</div>
      </div>`;
    }).join("");
    bindEditorInputs(root);
    $("#collapseAll").textContent = ui.openGroups.size ? "全部收起" : "全部展开";
  }

  function groupCount(id) {
    if (id === "basics") return 9;
    if (id === "summary") return state.summary.bullets.filter(Boolean).length + 1;
    if (id === "skills") return state.skills.length;
    if (id === "custom") return state.custom.length;
    return state[id]?.length || 0;
  }

  function fieldHtml(label, value, path, opts = {}) {
    const tag = opts.multiline ? "textarea" : "input";
    const type = opts.type || "text";
    const wide = opts.wide ? " is-wide" : "";
    const attrs = tag === "input" ? `type="${type}"` : "";
    return `<label class="field${wide}"><span class="field-label">${label}</span><${tag} ${attrs} data-path="${path}" ${opts.placeholder ? `placeholder="${escapeHtml(opts.placeholder)}"` : ""}>${tag === "textarea" ? escapeHtml(value || "") : ""}</${tag}></label>`
      .replace(`<input type="text" data-path="${path}" ${opts.placeholder ? `placeholder="${escapeHtml(opts.placeholder)}"` : ""}></input>`, `<input type="text" data-path="${path}" value="${escapeHtml(value || "")}" ${opts.placeholder ? `placeholder="${escapeHtml(opts.placeholder)}"` : ""}>`);
  }

  function inputField(label, value, path, opts = {}) {
    return `<label class="field ${opts.wide ? "is-wide" : ""}"><span class="field-label">${label}</span><input type="${opts.type || "text"}" data-path="${path}" value="${escapeHtml(value || "")}" placeholder="${escapeHtml(opts.placeholder || "")}"></label>`;
  }

  function textareaField(label, value, path) {
    return `<label class="field is-wide"><span class="field-label">${label}</span><textarea data-path="${path}">${escapeHtml(value || "")}</textarea></label>`;
  }

  function groupEditorHtml(id) {
    if (id === "basics") {
      const b = state.basics;
      return `<div class="field-grid">
        ${inputField("姓名", b.name, "basics.name")}
        ${inputField("职位方向", b.role, "basics.role")}
        ${inputField("所在城市", b.location, "basics.location")}
        ${inputField("联系电话", b.phone, "basics.phone")}
        ${inputField("邮箱", b.email, "basics.email", { wide: true })}
        ${inputField("求职状态", b.status, "basics.status")}
        ${inputField("性别", b.gender, "basics.gender")}
        ${inputField("籍贯", b.hometown, "basics.hometown")}
        ${inputField("政治面貌", b.political, "basics.political")}
      </div>
      <div class="photo-field-row">
        ${state.photo ? `<img class="photo-thumb" src="${state.photo}" alt="当前头像">` : `<div class="photo-thumb"></div>`}
        <button type="button" class="mini-action" id="changePhoto">更换头像</button>
        ${state.photo ? `<button type="button" class="mini-action" id="removePhoto">移除</button>` : ""}
      </div>`;
    }
    if (id === "summary") {
      const bulletText = state.summary.bullets.map(richToMarkdown).join("\n");
      return `<div class="field-grid">
        ${textareaField("概述", String(state.summary.lead).replace(/<[^>]+>/g, ""), "summary.lead")}
        ${textareaField("亮点（每行一条，**文字**可加粗）", bulletText, "summary.bullets")}
      </div>`;
    }
    if (id === "skills") {
      return state.skills.map((s, i) => `<div class="item-card" data-item="skills" data-index="${i}">
        <div class="item-card-head"><span>技能 ${i + 1}</span>${itemActions("skills", i)}</div>
        <div class="field-grid">
          ${inputField("名称", s.name, `skills.${i}.name`)}
          ${inputField("熟练度 0-5", s.level, `skills.${i}.level`, { type: "number" })}
          ${inputField("说明", s.desc, `skills.${i}.desc`, { wide: true })}
        </div>
      </div>`).join("") + `<button type="button" class="add-item" data-add="skills">＋ 添加技能</button>`;
    }
    if (id === "custom") {
      return state.custom.map((item, i) => `<div class="item-card" data-item="custom" data-index="${i}">
        <div class="item-card-head"><span>自定义经历 ${i + 1}</span>${itemActions("custom", i)}</div>
        <div class="field-grid">
          ${inputField("标题", item.title, `custom.${i}.title`)}
          ${inputField("时间", item.date, `custom.${i}.date`)}
          ${textareaField("内容", item.content, `custom.${i}.content`)}
        </div>
      </div>`).join("") + `<button type="button" class="add-item" data-add="custom">＋ 添加自定义经历</button>`;
    }
    const items = state[id] || [];
    return items.map((item, i) => `<div class="item-card" data-item="${id}" data-index="${i}">
      <div class="item-card-head"><span>${id === "education" ? "教育" : id === "projects" ? "项目" : "工作"} ${i + 1}</span>${itemActions(id, i)}</div>
      <div class="field-grid">
        ${inputField(id === "education" ? "学校" : id === "projects" ? "项目名称" : "公司名称", item.org, `${id}.${i}.org`)}
        ${inputField("时间", item.date, `${id}.${i}.date`)}
        ${inputField(id === "education" ? "专业" : "职位 / 角色", item.title, `${id}.${i}.title`)}
        ${id === "education" ? inputField("学历", item.right || "", `${id}.${i}.right`) : ""}
        ${textareaField("描述（每行一条，**文字**可加粗）", (item.bullets || []).map(richToMarkdown).join("\n"), `${id}.${i}.bullets`)}
      </div>
    </div>`).join("") + `<button type="button" class="add-item" data-add="${id}">＋ 添加${id === "education" ? "教育经历" : id === "projects" ? "项目经历" : "工作经历"}</button>`;
  }

  function itemActions(type, index) {
    return `<span class="item-actions">
      <button type="button" data-move="${type}" data-index="${index}" data-dir="-1" title="上移">↑</button>
      <button type="button" data-move="${type}" data-index="${index}" data-dir="1" title="下移">↓</button>
      <button type="button" data-delete="${type}" data-index="${index}" title="删除">×</button>
    </span>`;
  }

  function getPath(obj, path) {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  }
  function setPath(obj, path, value) {
    const parts = path.split(".");
    const last = parts.pop();
    const target = parts.reduce((acc, key) => acc[key], obj);
    target[last] = value;
  }

  function bindEditorInputs(root) {
    $$("[data-path]", root).forEach(input => {
      input.addEventListener("input", () => {
        const path = input.dataset.path;
        let value = input.value;
        if (/\.(level)$/.test(path)) value = Math.min(5, Math.max(0, +value || 0));
        if (/summary\.bullets$/.test(path)) value = value.split("\n").map(markdownToRich);
        if (/\.bullets$/.test(path)) value = value.split("\n").filter((v, i, arr) => v.length || i < arr.length - 1).map(markdownToRich);
        setPath(state, path, value);
        scheduleRender();
        updateCounts();
      });
    });
  }

  function richToMarkdown(text) {
    return String(text)
      .replace(/<strong>/gi, "**").replace(/<\/strong>/gi, "**")
      .replace(/<b>/gi, "**").replace(/<\/b>/gi, "**");
  }

  function markdownToRich(text) {
    return String(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  }

  function updateCounts() {
    $$(".editor-group").forEach(group => {
      const id = group.dataset.group;
      const count = $(".group-count", group);
      if (count) count.textContent = groupCount(id);
    });
  }

  function renderPresets() {
    $("#presetGrid").innerHTML = PRESETS.map(p => `<button type="button" class="preset-card ${state.template === p.id ? "is-active" : ""}" data-preset="${p.id}" style="--preset-accent:${p.accent}"><div class="preset-thumb"></div><span>${p.name}</span></button>`).join("");
    $("#swatchList").innerHTML = ACCENT_SWATCHES.map(c => `<button type="button" class="swatch ${state.accent.toLowerCase() === c.toLowerCase() ? "is-active" : ""}" data-swatch="${c}" style="background:${c}" aria-label="${c}"></button>`).join("");
  }

  function updateStyleControls() {
    $("#accentColor").value = state.accent;
    $("#densityRange").value = state.density;
    $("#densityValue").textContent = state.density < 90 ? "紧凑" : state.density > 102 ? "舒展" : "舒适";
    $("#headerShape").value = state.headerShape;
    $("#showPhoto").checked = state.showPhoto;
    $("#pageMargin").value = state.margin;
    renderPresets();
  }

  function switchPanel(panel) {
    ui.panel = panel;
    $$(".step").forEach(btn => btn.classList.toggle("is-active", btn.dataset.step === panel));
    $$("[data-panel]").forEach(el => { el.hidden = el.dataset.panel !== panel; });
    if (panel === "fit") setTimeout(updateOverflowState, 30);
  }

  function setZoom(zoom) {
    ui.zoom = Math.min(1.35, Math.max(.42, zoom));
    updateZoom();
  }

  function updateZoom() {
    const stage = $("#paperStage");
    if (stage.classList.contains("is-fullscreen")) {
      const availH = stage.clientHeight - 70;
      const availW = stage.clientWidth - 50;
      const z = Math.min(availH / 1123, availW / 794, 1.25);
      $("#paperScaler").style.transform = `scale(${z})`;
      $("#paperScaler").style.height = `${1123 * z}px`;
      $("#zoomLabel").textContent = `${Math.round(z * 100)}%`;
      return;
    }
    $("#paperScaler").style.transform = `scale(${ui.zoom})`;
    $("#paperScaler").style.height = `${1123 * ui.zoom}px`;
    $("#zoomLabel").textContent = `${Math.round(ui.zoom * 100)}%`;
  }

  function fitWidth() {
    const stage = $("#paperStage");
    const available = Math.max(280, stage.clientWidth - (window.innerWidth < 760 ? 20 : 70));
    setZoom(Math.min(.98, available / 794));
  }

  function getContentHeight() {
    const content = $("#resumeContent");
    if (!content) return 1123;
    const children = [...content.children];
    if (!children.length) return 0;
    const top = $("#resumePage").getBoundingClientRect().top;
    const renderedWidth = $("#paperScaler").getBoundingClientRect().width;
    const scale = renderedWidth ? renderedWidth / 794 : (ui.zoom || 1);
    return Math.max(...children.map(el => el.getBoundingClientRect().bottom - top)) / scale;
  }

  function updateOverflowState() {
    const height = getContentHeight();
    const ratio = height / 1123;
    const isOver = ratio > 1.003;
    $("#fitStatus").textContent = isOver ? "需要压缩" : "适合一页";
    $("#fitStatus").classList.toggle("warn", isOver);
    $("#pageUsage").textContent = `${Math.min(999, Math.round(ratio * 100))}%`;
    $("#overflowNotice").textContent = isOver ? `内容约超出 ${Math.max(1, Math.round((ratio - 1) * 1123))}px` : "版面状态良好";
    $("#overflowNotice").style.color = isOver ? "#a36a1d" : "";
    return { height, ratio, isOver };
  }

  function autoFit() {
    ui.fitting = true;
    const initialDensity = state.density;
    let density = Math.min(100, Math.max(80, state.density));
    const originalMargin = state.margin;
    if (state.margin === "airy") state.margin = "standard";
    applyDensity();
    let info = updateOverflowState();
    while (info.isOver && density > 80) {
      density = Math.max(80, density - 1);
      state.density = density;
      renderPreview();
      info = updateOverflowState();
    }
    if (info.isOver) {
      state.margin = "compact";
      applyDensity();
      info = updateOverflowState();
    }
    if (!info.isOver) {
      toast(`已适配一页 · 内容密度 ${state.density < 90 ? "紧凑" : "舒适"}`);
    } else {
      state.density = initialDensity;
      state.margin = originalMargin;
      renderPreview();
      toast("内容较多，已保持最小可读字号；建议精简 1-2 条描述");
    }
    updateStyleControls();
    saveState();
    ui.fitting = false;
  }

  function addItem(type) {
    if (type === "skills") {
      state.skills.push({ name: "新技能", level: 3, desc: "技能说明" });
    } else if (type === "custom") {
      state.custom.push({ id: uid("custom"), title: "自定义经历", date: "", content: "在这里填写经历内容。" });
    } else if (type === "education") {
      state.education.push({ id: uid("edu"), org: "学校名称", title: "专业名称", right: "本科", date: "2020-09 - 2024-06", bullets: ["在这里填写教育经历亮点"] });
    } else if (type === "projects") {
      state.projects.push({ id: uid("proj"), org: "项目名称", title: "角色", date: "2024-01 - 2024-12", bullets: ["在这里填写项目成果"] });
    } else {
      state.experience.push({ id: uid("exp"), org: "公司名称", title: "职位", date: "2023-01 - 至今", bullets: ["在这里填写工作成果"] });
    }
    ui.openGroups.add(type);
    renderEditor();
    renderPreview();
    saveState();
  }

  function moveItem(type, index, dir) {
    const arr = state[type];
    if (!arr) return;
    const target = index + Number(dir);
    if (target < 0 || target >= arr.length) return;
    [arr[index], arr[target]] = [arr[target], arr[index]];
    renderEditor();
    renderPreview();
    saveState();
  }

  function deleteItem(type, index) {
    const arr = state[type];
    if (!arr || arr.length <= 1) return toast("至少保留一条，避免版式结构缺失");
    if (!confirm("确认删除这一条内容？")) return;
    arr.splice(index, 1);
    renderEditor();
    renderPreview();
    saveState();
  }

  function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function readFileAsText(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  async function imagePalette(file) {
    const url = URL.createObjectURL(file);
    try {
      const img = await new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = url;
      });
      const canvas = document.createElement("canvas");
      const max = 320;
      const ratio = Math.min(1, max / Math.max(img.width, img.height));
      canvas.width = Math.max(1, Math.round(img.width * ratio));
      canvas.height = Math.max(1, Math.round(img.height * ratio));
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const buckets = new Map();
      for (let i = 0; i < data.length; i += 16) {
        const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
        if (a < 180) continue;
        const maxc = Math.max(r, g, b), minc = Math.min(r, g, b);
        const sat = maxc - minc;
        const light = (r + g + b) / 3;
        if (sat < 35 || light < 22 || light > 235) continue;
        const key = `${Math.round(r / 20) * 20},${Math.round(g / 20) * 20},${Math.round(b / 20) * 20}`;
        buckets.set(key, (buckets.get(key) || 0) + 1);
      }
      let best = null;
      for (const [key, count] of buckets) {
        const [r, g, b] = key.split(",").map(Number);
        const sat = Math.max(r, g, b) - Math.min(r, g, b);
        const light = (r + g + b) / 3;
        const score = count * (1 + sat / 150) * (light > 80 && light < 215 ? 1.3 : .6);
        if (!best || score > best.score) best = { r, g, b, score, count };
      }
      if (!best) return { accent: "#1f67ed", isColored: false };
      const to = v => Math.min(255, Math.max(0, Math.round(v))).toString(16).padStart(2, "0");
      return { accent: `#${to(best.r)}${to(best.g)}${to(best.b)}`, isColored: true };
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  async function analyzeImage(file) {
    const palette = await imagePalette(file);
    const dataUrl = await readFileAsDataURL(file);
    const img = await new Promise((resolve, reject) => {
      const image = new Image(); image.onload = () => resolve(image); image.onerror = reject; image.src = dataUrl;
    });
    const ratio = img.height / img.width;
    const features = {
      ratio,
      template: ratio > 1.24 ? "sidebar" : ratio < 1.15 ? "minimal" : "classic",
      shape: ratio > 1.24 ? "straight" : "rounded",
      density: ratio > 1.45 ? 88 : 96
    };
    return { palette, dataUrl, features };
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const existing = [...document.scripts].find(script => script.src === src);
      if (existing) {
        if (window.Tesseract) resolve(window.Tesseract);
        else existing.addEventListener("load", () => resolve(window.Tesseract), { once: true });
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(window.Tesseract);
      script.onerror = () => reject(new Error("OCR script failed to load"));
      document.head.appendChild(script);
    });
  }

  async function recognizeWithOcr(file) {
    const Tesseract = await loadScript("https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js");
    if (!Tesseract?.createWorker) throw new Error("OCR engine unavailable");
    const worker = await Tesseract.createWorker("chi_sim", 1, {
      logger: msg => {
        if (msg.status === "recognizing text") {
          $("#ocrStatus").textContent = `正在识别文字 ${Math.round(msg.progress * 100)}%`;
          $("#ocrProgress span").style.width = `${Math.max(12, msg.progress * 100)}%`;
        }
      },
      cacheMethod: "none"
    });
    await worker.setParameters({ tessedit_pageseg_mode: "6", preserve_interword_spaces: "1" });
    try {
      const result = await worker.recognize(file);
      return result;
    } finally {
      await worker.terminate();
    }
  }

  function makeOcrFriendlyImage(file) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const image = new Image();
      image.onload = () => {
        const scale = Math.max(1, Math.min(2.4, 2200 / image.width));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "medium";
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
        resolve(canvas.toDataURL("image/png"));
      };
      image.onerror = error => { URL.revokeObjectURL(url); reject(error); };
      image.src = url;
    });
  }

  function openImportModal() {
    $("#importModal").hidden = false;
    $("#importStatus").textContent = "等待选择图片";
  }

  async function beginImageImport(file) {
    if (!file || !file.type.startsWith("image/")) return toast("请选择 PNG、JPG 或 WEBP 图片");
    $("#importStatus").textContent = "正在分析版式与配色…";
    try {
      const result = await analyzeImage(file);
      importContext = { image: result.dataUrl, palette: result.palette, features: result.features, text: "" };
      $("#importStatus").textContent = "版式分析完成";
      $("#importModal").hidden = true;
      if ($("#mergeToggle").checked) {
        $("#ocrModal").hidden = false;
        $("#ocrText").value = "正在识别图片文字，请稍候…";
        $("#ocrProgress span").style.width = "12%";
        $("#ocrStatus").textContent = "正在加载 OCR 引擎";
        try {
          const preparedImage = await makeOcrFriendlyImage(file);
          const result = await recognizeWithOcr(preparedImage);
          const text = cleanOcrText(result.data.text || "");
          importContext.text = text;
          $("#ocrText").value = text || "未识别到清晰文字。请保留当前内容，或在此粘贴图片中的简历文字。";
          $("#ocrStatus").textContent = "识别完成，请校对";
          $("#ocrProgress span").style.width = "100%";
        } catch (error) {
          console.warn(error);
          $("#ocrText").value = "OCR 引擎未能加载。你可以在这里粘贴图片中的简历文字，或取消后仅套用视觉样式。";
          $("#ocrStatus").textContent = "OCR 不可用，可手动粘贴文字";
          $("#ocrProgress span").style.width = "100%";
        }
      } else {
        applyImportedStyle(false);
      }
    } catch (error) {
      console.error(error);
      $("#importStatus").textContent = "图片分析失败，请换一张图片";
      toast("图片读取失败");
    }
  }

  function cleanOcrText(text) {
    return text
      .replace(/\r/g, "")
      .split("\n")
      .map(line => line.trim().replace(/\s{2,}/g, " "))
      .filter(line => line && !/^(添加改写建议|手动编辑|下载无水印)$/.test(line))
      .join("\n");
  }

  function applyImportedStyle(withText = true) {
    if (!importContext.features) return;
    const oldPhoto = state.photo;
    const oldAccent = state.accent;
    state.template = importContext.features.template;
    state.headerShape = importContext.features.shape;
    state.density = importContext.features.density;
    state.accent = importContext.palette?.accent || state.accent;
    if (withText) {
      const parsed = parseResumeText($("#ocrText").value);
      if (parsed) state = Object.assign(state, parsed, { photo: oldPhoto, accent: oldAccent });
    }
    $("#ocrModal").hidden = true;
    $("#importModal").hidden = true;
    renderEditor();
    renderPreview();
    updateStyleControls();
    saveState();
    toast(withText ? "已识别内容并生成新版简历" : "已套用图片视觉样式");
  }

  function parseResumeText(text) {
    const lines = text.split("\n").map(v => v.trim()).filter(Boolean);
    if (lines.length < 4) return null;
    const parsed = clone(DEFAULT_DATA);
    parsed.photo = state.photo;
    const phoneMatch = text.match(/(?<!\d)1[3-9]\d(?:[\s-]?\d){8}(?!\d)/);
    const emailMatch = text.match(/[\w.+-]+@[\w.-]+\.[a-zA-Z]{2,}/);
    const nameLine = lines.find(line => line.length >= 2 && line.length <= 5 && /^[\u4e00-\u9fa5·]{2,5}$/.test(line));
    if (nameLine) parsed.basics.name = nameLine;
    if (phoneMatch) parsed.basics.phone = phoneMatch[0].replace(/\D/g, "");
    if (emailMatch) parsed.basics.email = emailMatch[0];
    const roleLine = lines.find(line => /经理|设计师|工程师|产品|运营|开发|总监|主管|教师|顾问/.test(line) && line.length < 36);
    if (roleLine) parsed.basics.role = roleLine.replace(/^(求职意向|应聘岗位|职位)[：:\s]*/, "");
    const locationMatch = text.match(/(?:地址|现居|所在地)[：:\s]*([^\s，,|]{2,12})/);
    if (locationMatch) parsed.basics.location = locationMatch[1];
    const statusMatch = text.match(/(?:当前状态|求职状态|状态)[：:\s]*([^\n，,|]{2,20})/);
    const genderMatch = text.match(/(?:性别)[：:\s]*([男女])/);
    const hometownMatch = text.match(/(?:籍贯)[：:\s]*([^\s，,|]{2,12})/);
    const politicalMatch = text.match(/(?:政治面貌)[：:\s]*([^\s，,|]{2,12})/);
    parsed.basics.status = statusMatch?.[1]?.trim() || "";
    parsed.basics.gender = genderMatch?.[1] || "";
    parsed.basics.hometown = hometownMatch?.[1] || "";
    parsed.basics.political = politicalMatch?.[1] || "";
    const headings = {
      summary: /^(?:个人总结|自我评价|个人优势|关于我)[：:\s]*$/,
      experience: /^(?:工作经历|工作经验|职业经历)[：:\s]*$/,
      projects: /^(?:项目经历|项目经验|代表项目)[：:\s]*$/,
      education: /^(?:教育经历|教育背景)[：:\s]*$/,
      skills: /^(?:技能|专业技能|专业能力|擅长)[：:\s]*$/,
      custom: /^(?:荣誉|证书|获奖|其他经历)[：:\s]*$/
    };
    const buckets = { intro: [] };
    let current = "intro";
    lines.forEach(line => {
      const key = Object.keys(headings).find(k => headings[k].test(line));
      if (key) { current = key; buckets[key] ||= []; return; }
      (buckets[current] ||= []).push(line);
    });
    if (buckets.summary?.length) {
      parsed.summary.lead = stripOcrBullet(buckets.summary[0]);
      parsed.summary.bullets = buckets.summary.slice(1, 5).map(stripOcrBullet).filter(Boolean);
    } else if (buckets.intro.length) {
      const intro = buckets.intro.filter(line => ![parsed.basics.name, parsed.basics.role].includes(line) && !/^个人详情$/.test(line));
      parsed.summary.lead = intro.find(line => line.length > 16) || intro[0] || "";
      parsed.summary.bullets = intro.filter(line => line !== parsed.summary.lead).slice(0, 4).map(stripOcrBullet).filter(Boolean);
    }
    parsed.experience = parseEntries(buckets.experience || [], "exp");
    parsed.projects = parseEntries(buckets.projects || [], "proj");
    parsed.education = parseEntries(buckets.education || [], "edu");
    const skillLines = buckets.skills || [];
    const foundSkills = skillLines.filter(line => line.length <= 28).slice(0, 6);
    if (foundSkills.length) parsed.skills = foundSkills.map((name, i) => ({ name: name.replace(/[：:].*$/, ""), level: 4, desc: name.includes("：") ? name.split(/[：:]/).slice(1).join("") : "" }));
    parsed.custom = [];
    if (buckets.custom?.length) {
      parsed.custom = buckets.custom.slice(0, 3).map((line, i) => ({ id: `custom-${i}`, title: `其他经历 ${i + 1}`, date: "", content: line }));
    }
    parsed.basics.name = parsed.basics.name || lines[0];
    parsed.basics.role = parsed.basics.role || lines[1] || "";
    parsed.basics.phone = parsed.basics.phone || "";
    parsed.basics.email = parsed.basics.email || "";
    return parsed;
  }

  function parseEntries(lines, prefix) {
    if (!lines.length) return [];
    const entries = [];
    let current = null;
    const dateRe = /(?:19|20)\d{2}\s*[-–—./]\s*(?:0?[1-9]|1[0-2])(?:\s*[-–—./]\s*(?:(?:19|20)\d{2}\s*[-–—./]\s*(?:0?[1-9]|1[0-2])|至今))?/;
    lines.forEach(line => {
      const dateMatch = line.match(dateRe);
      const date = dateMatch?.[0] || "";
      const bullet = /^[•·▪◦*\-—;；,，。]/.test(line);
      if (current && date && !current.date) {
        current.date = date;
        const orgPart = line.replace(date, "").replace(/[|｜]\s*$/, "").trim();
        if (orgPart && !current.org) current.org = orgPart;
        return;
      }
      if (!bullet && (date || (!current && line.length < 40))) {
        const org = dateMatch ? line.replace(date, "").replace(/[|｜]\s*$/, "").trim() : line;
        current = { id: uid(prefix), org, title: "", date, bullets: [] };
        entries.push(current);
      } else if (current) {
        const clean = stripOcrBullet(line);
        if (!current.title && clean.length < 22 && !/[。；;]/.test(clean)) current.title = clean;
        else if (clean) current.bullets.push(clean);
      }
    });
    return entries.slice(0, 4);
  }

  function stripOcrBullet(line) {
    return String(line)
      .replace(/^[•·▪◦*\-—;；,，。]+\s*/, "")
      .replace(/^。\s*/, "")
      .trim();
  }

  function exportHtml() {
    const resume = $("#resumePage")?.cloneNode(true);
    if (!resume) return;
    resume.removeAttribute("id");
    const css = `:root{--font-cn:"Noto Sans SC","Microsoft YaHei",sans-serif;--font-ui:"DM Sans",sans-serif}
      *{box-sizing:border-box}.resume-page{width:794px;height:1123px;min-height:1123px;background:#fff;position:relative;overflow:hidden;color:#202833;font-family:var(--font-cn)}
      .resume-content{width:100%;height:100%;position:relative;--accent:#1f67ed;--section-gap:25px;--line-height:1.55}
      .resume-header{min-height:245px;position:relative;overflow:hidden;background:var(--accent);color:#fff;padding:22px 30px 20px;display:flex;align-items:center;gap:26px}
      .header-rounded .resume-header{border-radius:0 0 32px 0}.header-straight .resume-header{border-radius:0}.header-arch .resume-header{border-radius:0 0 32% 0/0 0 13% 0}
      .resume-header::after{content:"";position:absolute;right:-40px;top:-90px;width:250px;height:250px;border-radius:50%;background:rgba(255,255,255,.07)}
      .photo-frame{width:89px;height:111px;flex:0 0 89px;border-radius:7px;overflow:hidden;background:rgba(255,255,255,.15);border:2px solid rgba(255,255,255,.3);box-shadow:0 4px 13px rgba(5,20,52,.18);position:relative;z-index:1}
      .photo-frame img{width:100%;height:100%;display:block;object-fit:cover;object-position:center top}.photo-placeholder{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:700;opacity:.8}
      .header-identity{min-width:0;position:relative;z-index:1;flex:1}.resume-name{font-size:28px;line-height:1.1;font-weight:800;letter-spacing:.02em;margin:0 0 7px}.resume-role{font-size:13px;font-weight:500;color:rgba(255,255,255,.92);margin:0 0 15px;letter-spacing:.01em}
      .contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px 28px;max-width:575px}.contact-item{font-size:10px;color:rgba(255,255,255,.9);display:flex;gap:5px;line-height:1.35;min-width:0}.contact-item .label{color:rgba(255,255,255,.65);flex:0 0 auto}.contact-item .value{overflow-wrap:anywhere}
      .header-extra{margin-top:10px;display:flex;flex-wrap:wrap;gap:5px 22px}.header-extra span{font-size:9px;color:rgba(255,255,255,.83)}.header-extra b{color:rgba(255,255,255,.61);font-weight:400;margin-right:3px}
      .resume-main{padding:20px 31px 22px}.resume-section{margin-top:var(--section-gap)}.resume-section:first-child{margin-top:0}
      .section-heading{display:flex;align-items:center;height:27px;position:relative;margin-bottom:8px}.section-heading::after{content:"";position:absolute;height:100%;left:0;right:0;border-radius:999px;background:var(--accent-soft);opacity:.83}
      .section-tab{position:relative;z-index:1;height:27px;min-width:100px;border-radius:999px;background:var(--accent);color:#fff;display:inline-flex;align-items:center;justify-content:center;padding:0 18px;font-size:11px;font-weight:700;letter-spacing:.04em}
      .section-heading-line{position:relative;z-index:1;color:#9aabc4;font-size:8px;letter-spacing:.14em;margin-left:auto;margin-right:15px;font-family:var(--font-ui)}
      .summary-lead{font-size:10.5px;font-weight:600;line-height:var(--line-height);margin:0 0 4px;color:#27313d}.bullet-list{list-style:none;padding:0;margin:0}.bullet-list li{position:relative;font-size:10.2px;line-height:var(--line-height);color:#4d5867;padding-left:13px;margin:2px 0}.bullet-list li::before{content:"";position:absolute;left:2px;top:.63em;width:3px;height:3px;border-radius:50%;background:var(--accent)}.bullet-list strong{color:#293442;font-weight:700}
      .entry{margin-bottom:13px}.entry:last-child{margin-bottom:0}.entry-head{display:flex;align-items:flex-start;justify-content:space-between;gap:15px}.entry-org{font-size:10.7px;font-weight:700;color:#27313e;line-height:1.4}.entry-date{flex:0 0 auto;font-size:8.8px;color:#697588;line-height:1.35;white-space:nowrap;font-family:var(--font-ui)}.entry-subhead{display:flex;justify-content:space-between;gap:10px;color:#667386;font-size:9.6px;line-height:1.45;margin-top:1px}.entry-subhead .right{flex:0 0 auto;font-size:8.7px}.entry-title{color:#4f5d6f;font-size:9.3px;margin-top:1px}
      .skill-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.skill-name{font-size:9.8px;color:#344154;font-weight:700;margin-bottom:6px}.skill-dots{display:flex;gap:4px;margin-bottom:5px}.skill-dot{width:7px;height:7px;border-radius:50%;background:#d9e1ec}.skill-dot.on{background:var(--accent)}.skill-desc{font-size:8.7px;color:#687586;line-height:1.5}
      .resume-page[data-template="sidebar"] .resume-header{min-height:180px;padding:27px 32px 20px;border-radius:0}.resume-page[data-template="sidebar"] .resume-main{display:grid;grid-template-columns:1fr 218px;gap:22px;padding-top:20px}.resume-page[data-template="sidebar"] .resume-section{margin-top:17px}.resume-page[data-template="sidebar"] .side-column{padding-left:16px;border-left:1px solid #dbe4ef}.resume-page[data-template="sidebar"] .side-column .section-heading::after{background:#f0f4fa}.resume-page[data-template="sidebar"] .side-column .section-tab{min-width:75px;font-size:10px;padding:0 12px}.resume-page[data-template="sidebar"] .side-column .skill-grid{grid-template-columns:1fr;gap:12px}.resume-page[data-template="sidebar"] .side-column .bullet-list li{font-size:9px}
      .resume-page[data-template="editorial"] .resume-header{background:#f4f7fb;color:#1e2a3a;min-height:174px;padding:28px 34px;border-bottom:1px solid #dbe4ee;border-radius:0}.resume-page[data-template="editorial"] .resume-header::after{border:1px solid var(--accent);background:transparent;opacity:.18}.resume-page[data-template="editorial"] .resume-name{font-size:32px;letter-spacing:.06em}.resume-page[data-template="editorial"] .resume-role{color:#62738a}.resume-page[data-template="editorial"] .contact-item,.resume-page[data-template="editorial"] .header-extra span{color:#526276}.resume-page[data-template="editorial"] .contact-item .label,.resume-page[data-template="editorial"] .header-extra b{color:#8e9cac}.resume-page[data-template="editorial"] .photo-frame{border-color:#fff;box-shadow:0 4px 14px rgba(39,55,76,.12)}.resume-page[data-template="editorial"] .resume-main{padding-top:18px}.resume-page[data-template="editorial"] .section-heading::after{background:transparent;border-top:1px solid #dbe4ee;height:1px;top:50%;opacity:1}.resume-page[data-template="editorial"] .section-tab{background:transparent;color:#27364a;padding:0 16px 0 0;justify-content:flex-start}.resume-page[data-template="editorial"] .section-tab::after{content:"";width:6px;height:6px;border-radius:50%;background:var(--accent);position:absolute;left:-3px;top:9px}.resume-page[data-template="editorial"] .section-heading{padding-left:10px}
      .resume-page[data-template="minimal"] .resume-header{background:#fff;color:#1e2a3a;border-radius:0;min-height:164px;padding:28px 31px 18px;border-bottom:3px solid var(--accent)}.resume-page[data-template="minimal"] .resume-header::after{display:none}.resume-page[data-template="minimal"] .resume-name{font-size:29px;letter-spacing:.08em}.resume-page[data-template="minimal"] .resume-role{color:var(--accent);margin-bottom:12px}.resume-page[data-template="minimal"] .contact-item,.resume-page[data-template="minimal"] .header-extra span{color:#566577}.resume-page[data-template="minimal"] .contact-item .label,.resume-page[data-template="minimal"] .header-extra b{color:#96a1af}.resume-page[data-template="minimal"] .photo-frame{border-color:#e1e7ef;box-shadow:none}.resume-page[data-template="minimal"] .section-heading::after{display:none}.resume-page[data-template="minimal"] .section-tab{color:#29364a;background:transparent;padding:0;min-width:auto;border-bottom:2px solid var(--accent);border-radius:0}.resume-page[data-template="minimal"] .section-heading-line{color:#aab4c0}.resume-page[data-template="minimal"] .section-heading{height:23px;margin-bottom:7px}
      @media print{@page{size:A4;margin:0}body{background:#fff;padding:0;display:block}.resume-page{box-shadow:none!important}}`;
    const exportedBody = `body{margin:0;background:#e8edf4;display:flex;justify-content:center;padding:24px;font-family:"Noto Sans SC","Microsoft YaHei",sans-serif}.resume-page{box-shadow:0 18px 50px rgba(35,50,77,.15);flex:0 0 auto}
      @media print{@page{size:A4;margin:0}body{background:#fff;padding:0;display:block}.resume-page{box-shadow:none}}`;
    const embedded = resume.innerHTML.replace(/src="([^"]+)"/g, (match, src) => {
      if (src.startsWith("data:") || src.startsWith("http")) return match;
      try {
        const absolute = new URL(src, location.href).href;
        return `src="${absolute}"`;
      } catch { return match; }
    });
    resume.innerHTML = embedded;
    const html = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(state.basics.name)} - 简历</title><style>${exportedBody}${css}</style></head><body>${resume.outerHTML}</body></html>`;
    downloadBlob(new Blob([html], { type: "text/html;charset=utf-8" }), `${state.basics.name || "简历"}-可编辑版.html`);
    toast("已导出独立 HTML");
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  function exportJson() {
    const data = { ...state, photo: state.photo || "" };
    downloadBlob(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }), `${state.basics.name || "简历"}-内容.json`);
    toast("已导出 JSON 内容");
  }

  async function exportPdf() {
    toast("正在准备 PDF…");
    saveState();
    await preparePrintRoot();
    await new Promise(resolve => setTimeout(resolve, 120));
    window.print();
  }

  async function preparePrintRoot() {
    const printRoot = $("#printRoot");
    const page = $("#resumePage");
    printRoot.innerHTML = "";
    const copy = page.cloneNode(true);
    copy.removeAttribute("id");
    copy.style.transform = "none";
    copy.style.margin = "0";
    printRoot.appendChild(copy);
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    return printRoot;
  }

  function resetAll() {
    if (!confirm("恢复示例内容会覆盖当前编辑，确认继续？建议先导出 JSON 备份。")) return;
    state = clone(DEFAULT_DATA);
    ui.openGroups = new Set(["basics", "summary"]);
    renderEditor(); renderPreview(); updateStyleControls(); saveState();
    toast("已恢复示例内容");
  }

  function bindEvents() {
    $$(".step").forEach(btn => btn.addEventListener("click", () => switchPanel(btn.dataset.step)));
    $("#collapseAll").addEventListener("click", () => {
      if (ui.openGroups.size) ui.openGroups.clear();
      else ui.openGroups = new Set(SECTION_META.map(m => m.id));
      renderEditor();
    });
    $("#editorList").addEventListener("click", e => {
      const toggle = e.target.closest("[data-toggle-group]");
      if (toggle) {
        const id = toggle.dataset.toggleGroup;
        ui.openGroups.has(id) ? ui.openGroups.delete(id) : ui.openGroups.add(id);
        renderEditor(); return;
      }
      const add = e.target.closest("[data-add]");
      if (add) { addItem(add.dataset.add); return; }
      const move = e.target.closest("[data-move]");
      if (move) { moveItem(move.dataset.move, +move.dataset.index, move.dataset.dir); return; }
      const del = e.target.closest("[data-delete]");
      if (del) { deleteItem(del.dataset.delete, +del.dataset.index); return; }
      if (e.target.closest("#changePhoto")) $("#photoInput").click();
      if (e.target.closest("#removePhoto")) { state.photo = ""; renderEditor(); renderPreview(); saveState(); }
    });
    $("#addSection").addEventListener("click", () => { ui.openGroups.add("custom"); switchPanel("content"); addItem("custom"); });
    $("#presetGrid").addEventListener("click", e => {
      const card = e.target.closest("[data-preset]");
      if (!card) return;
      const preset = PRESETS.find(p => p.id === card.dataset.preset);
      state.template = preset.id; state.accent = preset.accent; state.headerShape = preset.shape;
      renderPreview(); updateStyleControls(); saveState();
    });
    $("#swatchList").addEventListener("click", e => {
      const swatch = e.target.closest("[data-swatch]");
      if (!swatch) return;
      state.accent = swatch.dataset.swatch; renderPreview(); updateStyleControls(); saveState();
    });
    $("#accentColor").addEventListener("input", e => { state.accent = e.target.value; renderPreview(); saveState(); });
    $("#densityRange").addEventListener("input", e => { state.density = +e.target.value; $("#densityValue").textContent = state.density < 90 ? "紧凑" : state.density > 102 ? "舒展" : "舒适"; renderPreview(); saveState(); });
    $("#headerShape").addEventListener("change", e => { state.headerShape = e.target.value; renderPreview(); saveState(); });
    $("#showPhoto").addEventListener("change", e => { state.showPhoto = e.target.checked; renderPreview(); saveState(); });
    $("#pageMargin").addEventListener("change", e => { state.margin = e.target.value; renderPreview(); saveState(); });
    $("#autoFitButton").addEventListener("click", autoFit);
    $("#zoomOut").addEventListener("click", () => setZoom(ui.zoom - .1));
    $("#zoomIn").addEventListener("click", () => setZoom(ui.zoom + .1));
    $("#fitWidth").addEventListener("click", fitWidth);
    $("#fullscreenButton").addEventListener("click", () => {
      $("#paperStage").classList.toggle("is-fullscreen");
      updateZoom();
    });
    $("#exportButton").addEventListener("click", exportPdf);
    $("#importButton").addEventListener("click", openImportModal);
    $("#moreButton").addEventListener("click", () => { $("#moreMenu").hidden = !$("#moreMenu").hidden; });
    $("#moreMenu").addEventListener("click", e => {
      const btn = e.target.closest("[data-action]");
      if (!btn) return;
      $("#moreMenu").hidden = true;
      if (btn.dataset.action === "export-html") exportHtml();
      if (btn.dataset.action === "export-json") exportJson();
      if (btn.dataset.action === "import-json") $("#jsonInput").click();
      if (btn.dataset.action === "reset") resetAll();
    });
    $("#chooseImageButton").addEventListener("click", () => $("#imageInput").click());
    $("#dropZone").addEventListener("click", () => $("#imageInput").click());
    $("#dropZone").addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") $("#imageInput").click(); });
    ["dragenter", "dragover"].forEach(type => $("#dropZone").addEventListener(type, e => { e.preventDefault(); $("#dropZone").classList.add("is-over"); }));
    ["dragleave", "drop"].forEach(type => $("#dropZone").addEventListener(type, e => { e.preventDefault(); $("#dropZone").classList.remove("is-over"); }));
    $("#dropZone").addEventListener("drop", e => beginImageImport(e.dataTransfer.files[0]));
    $("#imageInput").addEventListener("change", e => { if (e.target.files[0]) beginImageImport(e.target.files[0]); e.target.value = ""; });
    $("#photoInput").addEventListener("change", async e => {
      const file = e.target.files[0];
      if (!file) return;
      state.photo = await readFileAsDataURL(file);
      renderEditor(); renderPreview(); saveState(); toast("头像已更新");
      e.target.value = "";
    });
    $("#jsonInput").addEventListener("change", async e => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const parsed = JSON.parse(await readFileAsText(file));
        state = normalizeData(parsed);
        if (!state.photo) state.photo = "headshot.jpg";
        renderEditor(); renderPreview(); updateStyleControls(); saveState();
        toast("JSON 内容已导入");
      } catch { toast("JSON 文件格式不正确"); }
      e.target.value = "";
    });
    $$("[data-close-modal]").forEach(btn => btn.addEventListener("click", () => { $("#importModal").hidden = true; $("#ocrModal").hidden = true; }));
    $$(".modal-backdrop").forEach(backdrop => backdrop.addEventListener("click", e => { if (e.target === backdrop) backdrop.hidden = true; }));
    $("#applyOcrButton").addEventListener("click", () => applyImportedStyle(true));
    window.addEventListener("beforeprint", () => { preparePrintRoot(); });
    window.addEventListener("afterprint", () => { $("#printRoot").innerHTML = ""; });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        $("#importModal").hidden = true; $("#ocrModal").hidden = true; $("#moreMenu").hidden = true;
        $("#paperStage").classList.remove("is-fullscreen"); updateZoom();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") { e.preventDefault(); saveState(false); }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") { e.preventDefault(); exportPdf(); }
    });
    document.addEventListener("click", e => {
      if (!e.target.closest(".topbar-actions")) $("#moreMenu").hidden = true;
    });
    window.addEventListener("resize", () => updateZoom());
  }

  function init() {
    renderEditor();
    renderPreview();
    renderPresets();
    updateStyleControls();
    bindEvents();
    if (window.innerWidth < 760) {
      ui.zoom = .46;
      updateZoom();
    } else {
      setTimeout(fitWidth, 80);
    }
  }

  init();
})();
