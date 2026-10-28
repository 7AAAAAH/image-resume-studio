  // Fragment 50: PDF, standalone HTML and JSON export.

  function blobToDataUrl(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  function canvasToDataUrl(img) {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      if (!canvas.width || !canvas.height) return "";
      canvas.getContext("2d").drawImage(img, 0, 0);
      return canvas.toDataURL("image/png");
    } catch {
      return "";
    }
  }

  async function inlineImages(sourceRoot, targetRoot) {
    const sourceImages = [...sourceRoot.querySelectorAll("img")];
    const targetImages = [...targetRoot.querySelectorAll("img")];
    for (let index = 0; index < targetImages.length; index += 1) {
      const img = targetImages[index];
      const src = img.getAttribute("src");
      if (!src || src.startsWith("data:")) continue;
      let dataUrl = "";
      try {
        const response = await fetch(src);
        if (response.ok) dataUrl = await blobToDataUrl(await response.blob());
      } catch {
        // file:// blocks fetch; fall back to the already decoded image.
      }
      if (!dataUrl) dataUrl = canvasToDataUrl(sourceImages[index]);
      if (dataUrl) {
        img.setAttribute("src", dataUrl);
        continue;
      }
      try {
        img.setAttribute("src", new URL(src, location.href).href);
      } catch {
        // Keep the original src when it cannot be resolved.
      }
    }
  }

  function collectExportCss() {
    const parts = [];
    for (const sheet of document.styleSheets) {
      let rules;
      try {
        rules = sheet.cssRules;
      } catch {
        continue;
      }
      for (const rule of rules) {
        if (rule.type === CSSRule.IMPORT_RULE) continue;
        if (rule.type === CSSRule.MEDIA_RULE && /\bprint\b/i.test(rule.conditionText || "")) continue;
        parts.push(rule.cssText);
      }
    }
    return parts.join("\n");
  }

  async function exportHtml() {
    const resume = $("#resumePage")?.cloneNode(true);
    if (!resume) return;
    resume.removeAttribute("id");
    await inlineImages($("#resumePage"), resume);
    const sourceCss = typeof EXPORT_CSS === "string" && EXPORT_CSS ? EXPORT_CSS : collectExportCss();
    const exportCss = `${sourceCss}
      html, body { min-height: 100%; }
      body { margin: 0; background: #e8edf4; display: flex; align-items: flex-start; justify-content: center; padding: 24px; font-family: var(--font-cn); }
      .resume-page { flex: 0 0 auto; box-shadow: 0 18px 50px rgba(35,50,77,.15), 0 2px 7px rgba(35,50,77,.06); }
      @media print {
        @page { size: A4 portrait; margin: 0; }
        html, body { width: 210mm !important; height: 297mm !important; min-height: 297mm !important; overflow: hidden !important; padding: 0 !important; background: #fff !important; display: block !important; }
        .resume-page { width: 210mm !important; height: 297mm !important; min-height: 297mm !important; box-shadow: none !important; overflow: hidden !important; }
        .resume-content { height: 100% !important; }
        .resume-page * { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
      }`;
    const html = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(state.basics.name)} - 简历</title><style>${exportCss}</style></head><body>${resume.outerHTML}</body></html>`;
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
