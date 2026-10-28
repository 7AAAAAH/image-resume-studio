  // Fragment 20: left-hand editor UI.

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
    const target = parts.reduce((acc, key) => {
      if (!acc[key] || typeof acc[key] !== "object") acc[key] = {};
      return acc[key];
    }, obj);
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
