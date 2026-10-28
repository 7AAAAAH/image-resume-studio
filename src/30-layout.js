  // Fragment 30: panels, zoom, overflow detection and auto-fit.

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
