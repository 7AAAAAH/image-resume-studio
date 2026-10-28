  // Fragment 10: resume preview rendering.

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
