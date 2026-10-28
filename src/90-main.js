  // Fragment 90: event binding and app startup.

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
        if (!state.photo) state.photo = DEMO_AVATAR;
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
    if (new URLSearchParams(location.search).has("test")) {
      window.__RS_TEST__ = { analyzeLayout, analyzeImage, classifyLayoutSignals, parseResumeText, normalizeData };
    }
  }

  init();
})();
