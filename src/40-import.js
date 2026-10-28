  // Fragment 40: image palette extraction, OCR and text parsing.

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

  const LAYOUT_TEMPLATE_NAMES = {
    classic: "蓝白经典",
    sidebar: "左侧信息栏",
    editorial: "编辑感留白",
    minimal: "极简线条"
  };

  function classifyLayoutSignals(signals) {
    const aspect = signals.aspect || 1.414;
    const headerRatio = signals.headerRatio || 0;
    const cornerGap = Number.isFinite(signals.cornerGap) ? signals.cornerGap : 0;
    const leftTint = signals.leftTint || 0;
    const rightTint = signals.rightTint || 0;
    const sideSignal = Math.max(leftTint, rightTint);

    let template = "classic";
    if (headerRatio < 0.1) template = "minimal";
    else if (sideSignal > 0.18 && Math.abs(leftTint - rightTint) > 0.12) template = "sidebar";

    const shape = cornerGap > 0.025 ? "rounded" : "straight";
    const density = headerRatio > 0.28 ? 88 : headerRatio < 0.15 ? 100 : 96;
    const confidence = Math.max(0.25, Math.min(0.9,
      0.35 +
      (headerRatio > 0.08 ? 0.2 : 0) +
      (cornerGap > 0.08 || cornerGap < 0.005 ? 0.15 : 0) +
      (sideSignal > 0.18 ? 0.15 : 0) +
      (aspect > 1.2 && aspect < 1.7 ? 0.1 : 0)
    ));

    return { aspect, template, shape, density, confidence };
  }

  async function analyzeLayout(img, accent) {
    const max = 480;
    const scale = Math.min(1, max / Math.max(img.width, img.height));
    const width = Math.max(1, Math.round(img.width * scale));
    const height = Math.max(1, Math.round(img.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, width, height);
    const { data } = ctx.getImageData(0, 0, width, height);
    const accentRgb = hexToRgb(accent);

    const isAccent = (index) => {
      const r = data[index], g = data[index + 1], b = data[index + 2], a = data[index + 3];
      if (a < 160) return false;
      return Math.hypot(r - accentRgb.r, g - accentRgb.g, b - accentRgb.b) < 70;
    };

    // Locate the coloured header band by scanning rows from the top.
    let headerEnd = 0;
    let run = 0;
    const scanLimit = Math.floor(height * 0.45);
    for (let y = 0; y < scanLimit; y += 1) {
      let count = 0;
      for (let x = 0; x < width; x += 1) {
        if (isAccent((y * width + x) * 4)) count += 1;
      }
      if (count / width > 0.12) {
        run += 1;
        headerEnd = y;
      } else if (run > 0 && y - headerEnd > 3) {
        break;
      }
    }
    const headerRatio = headerEnd / height;

    // A rounded bottom-right corner leaves mostly background pixels in the sample.
    let cornerInk = 1;
    let cornerGap = 0;
    if (headerEnd > 6) {
      const size = Math.max(4, Math.min(Math.floor(width * 0.12), Math.floor(headerEnd * 0.5)));
      let inked = 0;
      let total = 0;
      for (let y = Math.max(0, headerEnd - size); y < headerEnd; y += 1) {
        for (let x = Math.max(0, width - size); x < width; x += 1) {
          total += 1;
          if (isAccent((y * width + x) * 4)) inked += 1;
        }
      }
      cornerInk = total ? inked / total : 1;
      const row = Math.max(0, headerEnd - 1);
      let x = width - 1;
      while (x >= 0 && !isAccent((row * width + x) * 4)) {
        cornerGap += 1;
        x -= 1;
      }
      cornerGap /= width;
    }

    // Detect a tinted side column in the body, which suggests a sidebar layout.
    const bodyStart = Math.min(height - 1, Math.max(headerEnd + 4, Math.floor(height * 0.12)));
    const bodyEnd = Math.floor(height * 0.92);
    const bandWidth = Math.max(4, Math.floor(width * 0.18));
    const tintRatio = (x0, x1) => {
      let tinted = 0;
      let total = 0;
      for (let y = bodyStart; y < bodyEnd; y += 2) {
        for (let x = x0; x < x1; x += 2) {
          const index = (y * width + x) * 4;
          const r = data[index], g = data[index + 1], b = data[index + 2];
          const light = (r + g + b) / 3;
          const spread = Math.max(r, g, b) - Math.min(r, g, b);
          total += 1;
          if (light > 170 && light < 250 && spread > 6) tinted += 1;
        }
      }
      return total ? tinted / total : 0;
    };

    const signals = {
      aspect: img.height / img.width,
      headerRatio,
      cornerInk,
      cornerGap,
      leftTint: tintRatio(0, bandWidth),
      rightTint: tintRatio(width - bandWidth, width)
    };
    return { ...classifyLayoutSignals(signals), signals };
  }

  async function analyzeImage(file) {
    const palette = await imagePalette(file);
    const dataUrl = await readFileAsDataURL(file);
    const img = await new Promise((resolve, reject) => {
      const image = new Image(); image.onload = () => resolve(image); image.onerror = reject; image.src = dataUrl;
    });
    const features = await analyzeLayout(img, palette.accent);
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
      const detected = result.features;
      const shapeLabel = detected.shape === "rounded" ? "圆角头部" : "直角头部";
      $("#importStatus").textContent = `版式分析完成 · ${LAYOUT_TEMPLATE_NAMES[detected.template]} · ${shapeLabel} · ${Math.round(detected.confidence * 100)}%`;
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
