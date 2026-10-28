// Fragment 00: bootstrap, default data, constants, state and utilities.
(() => {
  "use strict";

  const DEMO_AVATAR = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNzggMjIyIiByb2xlPSJpbWciIGFyaWEtbGFiZWw9IkRlbW8gYXZhdGFyIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZGNlOGY3Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2I3Y2NlNiIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjE3OCIgaGVpZ2h0PSIyMjIiIGZpbGw9InVybCgjYmcpIi8+CiAgPGNpcmNsZSBjeD0iODkiIGN5PSI4NCIgcj0iMzciIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuODgiLz4KICA8cGF0aCBkPSJNMjIgMjIyYzUtNTQgMzMtODIgNjctODJzNjIgMjggNjcgODJ6IiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjg4Ii8+Cjwvc3ZnPg==";

  const DEFAULT_DATA = {
    version: 1,
    template: "classic",
    accent: "#2563eb",
    headerShape: "rounded",
    showPhoto: true,
    density: 96,
    margin: "standard",
    headerHeight: 177,
    radius: 34,
    cardRadius: 15,
    sectionGap: 34,
    lineHeight: 1.6,
    workCardStyle: "dashed",
    photo: DEMO_AVATAR,
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
    .replace(/<(?!\/?(?:strong|b)\b)[^>]+>/gi, "")
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
    data.basics = Object.assign(clone(DEFAULT_DATA.basics), input?.basics || {});
    data.summary = Object.assign(clone(DEFAULT_DATA.summary), input?.summary || {});
    data.experience = Array.isArray(input?.experience) ? input.experience : base.experience;
    data.projects = Array.isArray(input?.projects) ? input.projects : base.projects;
    data.education = Array.isArray(input?.education) ? input.education : base.education;
    data.skills = Array.isArray(input?.skills) ? input.skills : base.skills;
    data.custom = Array.isArray(input?.custom) ? input.custom : [];
    if (!PRESETS.some(p => p.id === data.template)) data.template = "classic";
    data.density = Number.isFinite(+data.density) ? Math.min(112, Math.max(80, +data.density)) : 96;
    data.headerHeight = Number.isFinite(+data.headerHeight) ? Math.min(235, Math.max(145, Math.round(+data.headerHeight))) : 177;
    data.radius = Number.isFinite(+data.radius) ? Math.min(58, Math.max(0, Math.round(+data.radius))) : 34;
    data.cardRadius = Number.isFinite(+data.cardRadius) ? Math.min(32, Math.max(0, Math.round(+data.cardRadius))) : 15;
    data.sectionGap = Number.isFinite(+data.sectionGap) ? Math.min(46, Math.max(14, Math.round(+data.sectionGap))) : 34;
    data.lineHeight = Number.isFinite(+data.lineHeight) ? Math.min(1.82, Math.max(1.32, Math.round(+data.lineHeight * 100) / 100)) : 1.6;
    if (!["dashed", "soft", "none"].includes(data.workCardStyle)) data.workCardStyle = "dashed";
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
      if (!history.applying) recordHistory();
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
