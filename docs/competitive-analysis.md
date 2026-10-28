# 竞品调研与优化建议

> 调研时间：2026-10。Star 数与功能基于公开仓库 / 官网 / README，可能随时间变化。

## 1. 结论先行

简历工具已经非常拥挤，但绝大多数产品走的是同一条路：**先有内容，再套内置模板**。

我们的产品走的是反方向：**先有设计（一张截图），再还原成可编辑模板**。这个方向目前只有少数项目在做，且几乎都依赖云端视觉大模型。

因此不建议把项目做成"又一个 Reactive Resume"。更合理的定位是：

> **把任何一张简历截图，在浏览器里复刻成可编辑、可打印的一页 A4。**

护城河不在模板数量，而在三件事：

1. **版式还原的可信度**（颜色、圆角、间距、层级、信息密度）；
2. **本地优先的隐私承诺**（不上传简历）；
3. **中文简历的一页 A4 工程经验**（中文字体度量、密度、分页）。

## 2. 竞品全景

| 项目 | 定位 | 输入 | 模板来源 | AI 能力 | 部署 | 许可 |
| --- | --- | --- | --- | --- | --- | --- |
| [Reactive Resume](https://github.com/AmruthPillai/Reactive-Resume) | 全能型简历平台 | 表单 / JSON / PDF / DOCX / LinkedIn | 12 套内置模板 | ATS 检查、AI 辅助 | Docker / 托管 | MIT |
| [Magic Resume](https://github.com/JOYCEQL/magic-resume) | 现代化在线简历编辑器 | 表单 | 主题化单模板体系 | BYOK 多模型 | Node / 本地 | Apache 2.0 + 非商用限制 |
| [JadeAI](https://github.com/JadeAI-hub/JadeAI) | AI 求职工作台 | 表单 / PDF / 图片 | 50+ 模板 | 解析、JD 匹配、ATS、改写、面试 | Docker / 托管 | Apache 2.0 |
| [Resume Matcher](https://github.com/srbhr/Resume-Matcher) | 针对 JD 定制简历 | 主简历 + JD | 复用主简历 | 100+ LLM、关键词匹配 | Docker / 本地 | Apache 2.0 |
| [OpenResume](https://github.com/xitanggg/open-resume) | 隐私优先的 ATS 简历 | 表单 / PDF | 少量模板 | ATS 解析 | 纯静态 | MIT |
| [JSON Resume](https://github.com/jsonresume/resume-schema) | 简历数据标准 | JSON | 200+ 社区主题 | 无 | 生态工具 | MIT |
| [RenderCV](https://github.com/rendercv/rendercv) | 学术 / 工程简历 | YAML | 主题化排版 | 无 | Python CLI | MIT |
| [Offer-skills](https://github.com/YIKUAIBO/offer-skills) | Codex 简历技能包 | 图片 / 文本 | 18 套模板 | 图片转 HTML | 本地 Skill | 见仓库 |
| [CV-MCP](https://github.com/liyongning/cv-mcp) | MCP 简历服务 | 文档 / 图片 | AI 生成 HTML 模板 | 视觉模型 + 优化 | 本地 / MCP | 见仓库 |
| [resumecloner-ai](https://github.com/WZB021120/resumecloner-ai) | 简历克隆 | 图片 | AI 生成 HTML 模板 | qwen3-vl-plus + JD 优化 | 本地 | 见仓库 |
| [ResumeGenie](https://github.com/perlay/ResumeGenie) | 图片简历优化 | 图片 | 固定模板 | OCR 提取 | 本地 / 托管 | 见仓库 |

## 3. 重点竞品拆解

### 3.1 Reactive Resume

- 约 4.5 万 Star，是这个赛道的事实标准。
- 关键能力：多格式导入、12 套模板、拖拽排序、富文本、多语言、分享链接、REST API、MCP Server、ATS 检查、Docker 自托管。
- **值得学习**：数据模型与模板注册表分离；导入适配器（JSON / PDF / DOCX / LinkedIn）统一转换成内部 schema；API 优先。
- **不必照抄**：账号体系、云同步、复杂后端。这些会让"双击即用"的优势消失。

### 3.2 Magic Resume

- 技术栈：TanStack Start + Motion + Tiptap + Tailwind，视觉完成度高。
- 关键能力：实时预览、主题切换、深浅色、PDF 导出、BYOK 多模型、多语言、localStorage。
- **值得学习**：BYOK（用户自带 Key）既保留 AI 能力，又避免平台承担密钥与隐私风险。
- **差距**：没有"从图片复刻版式"，模板仍是预设的。

### 3.3 JadeAI

- 约 1.8 千 Star，Next.js 16 + React 19，产品完成度接近商业产品。
- 关键能力：50+ 模板、拖拽 + 行内编辑、PDF / 图片解析、JD 匹配、ATS 评分、语法检查、翻译、模拟面试、Docker、SQLite / Postgres。
- **值得学习**：把"排版"扩展成"投递闭环"，用户愿意为结果付费。
- **差距**：部署重、依赖账号与数据库；对"只想复刻一张图"的用户过重。

### 3.4 Resume Matcher

- 约 2.8 万 Star，Apache 2.0。
- 核心模型：**一份主简历 + 针对每个 JD 派生一个版本**。
- **值得学习**：多简历管理不该是"复制粘贴"，而应是"主数据 + 派生 + 差异"。
- **差距**：不解决视觉复刻问题。

### 3.5 OpenResume / JSON Resume / RenderCV

- OpenResume 证明了"纯本地 + ATS 友好 + 极简"可以获得大量用户。
- JSON Resume 证明了标准 schema 能形成主题生态（200+ 主题）。
- RenderCV 证明了 YAML + 确定性排版在学术 / 工程人群中的价值。
- **值得学习**：把内部数据结构公开成 schema，是形成生态的前提。

### 3.6 图片复刻方向（与我们最接近）

- **Offer-skills**：以 Codex Skill 形式提供"图片转可编辑 HTML"，18 套模板，偏工作流而非产品。
- **CV-MCP**：MCP 服务，上传文档后由视觉模型生成可编辑 HTML 复刻件，再输出优化版 PDF。
- **resumecloner-ai**：用 qwen3-vl-plus 从图片生成 HTML 模板，并叠加 JD 优化。
- **ResumeGenie**：OCR 提取图片简历，套固定模板。

共性结论：

1. "图片转模板"的需求真实存在，且已被多个项目验证；
2. 现有方案普遍**依赖云端视觉模型**，离线不可用、成本不可控；
3. 现有方案对**中文简历的一页 A4**（字体度量、密度、分页）打磨不足；
4. 现有方案的**版式还原精度**普遍停留在"看起来像"，缺少可复用的版面描述。

## 4. 能力矩阵

> 基于公开资料整理，"部分"表示能力有限或需要额外配置。

| 能力 | 本项目 | Reactive Resume | Magic Resume | JadeAI | Offer-skills |
| --- | --- | --- | --- | --- | --- |
| 从图片复刻版式 | 部分（启发式） | 不支持 | 不支持 | 部分（解析内容） | 支持 |
| 浏览器内 OCR | 支持 | 不支持 | 不支持 | 支持 | 部分 |
| 一页 A4 自适应 | 支持 | 支持 | 支持 | 支持 | 部分 |
| 四套以上模板 | 4 套 | 12 套 | 主题化 | 50+ | 18 套 |
| ATS 检查 | 不支持 | 支持 | 不支持 | 支持 | 不支持 |
| JD 匹配 / 改写 | 不支持 | 有限 | 不支持 | 支持 | 不支持 |
| DOCX 导入 / 导出 | 不支持 | 支持 | 不支持 | 支持 | 不支持 |
| 纯静态、双击即用 | 支持 | 不支持 | 部分 | 不支持 | 支持 |
| 无需账号 | 支持 | 不支持 | 支持 | 不支持 | 支持 |
| 内容不上传 | 支持 | 不支持 | 支持 | 部分 | 支持 |
| 多语言界面 | 中文优先 | 多语言 | 中英 | 多语言 | 中文 |

## 5. 我们的差异化

### 5.1 已有优势

1. **入口不同**：别人问"你想用什么模板"，我们问"把你的简历发我"。
2. **零构建分发**：几个静态文件即可运行，适合国内网络与低配置电脑。
3. **中文一页 A4 打磨**：固定 794 × 1123 画布、密度调节、溢出检测、自动压缩。
4. **圆角卡片还原**：蓝色头部、右下圆角、胶囊标题、虚线经历卡片，这些细节是"像不像"的关键。
5. **隐私叙事清晰**：本地存储、图片不上传、OCR 在浏览器内完成。

### 5.2 当前短板

| 短板 | 现状 | 影响 |
| --- | --- | --- |
| 版式理解 | 启发式检测头部高度与圆角，仍无法识别卡片、分栏与字体 | 复刻精度上限低 |
| OCR 依赖 CDN | 首次使用需联网 | 离线场景失效 |
| 代码结构 | `app.js` 约 61KB 单文件 | 难维护、难测试 |
| 数据模型 | 固定栏目，富文本仅支持 `<strong>` | 表达能力有限 |
| 编辑器 | 无拖拽排序、无撤销、无行内编辑 | 体验落后 |
| 导出 | 独立 HTML 的图片是绝对路径 | 换机后图片可能失效 |
| 测试 | 无自动化测试 | 回归风险高 |
| 生态 | 无 schema、无模板格式 | 无法形成社区 |

## 6. 优化建议

### P0：先把"可信的开源项目"做出来（1-2 周）

1. 仓库工程化：LICENSE、README、CONTRIBUTING、Issue/PR 模板、CHANGELOG。
2. 拆分 `app.js`：`state / render / editor / import / export / ocr / presets` 七个模块，保持无构建可运行。
3. 增加 Playwright 冒烟测试：加载、编辑、切换版式、导出 JSON、打印预览。
4. 为 `parseResumeText`、`normalizeData`、`autoFit` 增加单元测试。
5. OCR 离线化：内置 worker 与语言包，或提供"离线包"下载；至少做到失败时明确降级。
6. 修复独立 HTML 导出：把头像内联为 data URL，保证换机可看。
7. 可访问性：表单 label、焦点顺序、键盘快捷键、对比度。
8. GitHub Pages 演示 + 一键部署。

### P1：真正"理解版式"（3-4 周）

1. 定义版面 DSL：

```json
{
  "page": { "size": "A4", "margin": 24 },
  "theme": { "accent": "#2563eb", "radius": 18, "surface": "#eef4ff" },
  "typography": { "scale": 1.0, "lineHeight": 1.55 },
  "regions": [
    { "type": "header", "layout": "photo-left", "height": 240 },
    { "type": "section", "title": "工作经历", "style": "dashed-card" }
  ]
}
```

2. 视觉模型适配层（BYOK）：OpenAI / Claude / Qwen-VL / GLM-4V，输出 DSL + 置信度；失败时回退到本地启发式。
3. 模板编辑器：区域拖拽、圆角 / 间距 / 字体 token 面板、实时预览。
4. 模板导入导出（`.resume-template.json`）。
5. 多页支持与分页规则（避免条目被截断）。
6. 头像裁剪、背景移除、圆角 / 描边控制。

### P2：从排版走向求职闭环（4-6 周）

1. JD 匹配：关键词覆盖、缺口清单、可执行改写建议。
2. ATS 检查：字体、表格、图片、联系方式、关键词密度。
3. PDF / DOCX 导入，DOCX 导出。
4. 内容改写：STAR 结构、量化表达、动词优化。
5. 多简历管理：主简历 + 针对不同 JD 的派生版本 + 版本历史。
6. 分享链接 / 二维码（可选云端）。

### P3：生态（6-8 周）

1. 模板市场（社区提交、评分、一键应用）。
2. 浏览器扩展：从招聘页一键导入 JD。
3. 插件 API / Web Component 嵌入。
4. 校招 / 团队版。

## 7. 工程建议

- **保留零构建分发**：核心仍是可直接打开的静态包；另提供 Vite + TypeScript 开发壳用于测试与类型检查。
- **数据模型版本化**：`version` 字段 + migration 函数，避免升级后旧 JSON 失效。
- **Design tokens 统一**：颜色、圆角、间距、字号全部走 CSS 变量，模板只描述 token。
- **Schema 校验**：用 JSON Schema / Zod 校验导入文件，给出可读错误。
- **性能预算**：核心包 gzip < 150KB，本地首屏 < 1s，PDF 导出 < 2s。
- **可观测性**：本地错误日志与"一键复制诊断信息"，不采集用户内容。

## 8. 开源与商业化

建议采用 **open-core**：

- 开源：核心编辑器、模板 DSL、导出、离线 OCR；
- 可选付费：云同步、AI 额度、团队协作、模板市场高级包。

比"完全免费 + 无后续"更可持续，也不会破坏本地优先的承诺。

## 9. 结论

1. 不要追求模板数量，先追求"复刻得像"。
2. 不要把产品做成重后端，先守住"双击即用、内容不上传"。
3. 下一步最高优先级是**版式 DSL + 视觉模型适配层**，这是从"工具"变成"引擎"的分水岭。
4. ATS / JD 是第二增长曲线，应在版式能力稳定后再做。
