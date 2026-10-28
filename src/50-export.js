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

  async function exportHtml() {
    const resume = $("#resumePage")?.cloneNode(true);
    if (!resume) return;
    resume.removeAttribute("id");
    await inlineImages($("#resumePage"), resume);
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
