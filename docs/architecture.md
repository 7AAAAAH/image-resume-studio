# 架构说明

## 1. 总体结构

这是一个无构建步骤的单页应用：

```
index.html      # 应用壳体：工具栏、编辑器容器、预览画布、弹窗
styles.css      # 工作台 UI + 四套简历版式 + 打印样式
app.js          # 构建产物：状态、渲染、编辑、导入、导出、OCR
headshot.svg    # 示例头像
```

运行时没有框架、没有打包器。`app.js` 是一个 IIFE。

### 1.1 源码与构建

可维护源码按功能拆分在 `src/`：

```
src/00-core.js     # 默认数据、常量、状态、工具函数
src/10-render.js   # 简历预览渲染
src/15-history.js  # 状态快照、撤销与重做
src/20-editor.js   # 左侧编辑器
src/30-layout.js   # 面板、缩放、溢出检测、一页适配
src/40-import.js   # 取色、OCR、文本解析
src/50-export.js   # PDF / HTML / JSON 导出
src/60-template.js # 模板 DSL 与模板导入导出
src/70-ai.js       # 可选 BYOK 视觉模型适配器
src/90-main.js     # 事件绑定与启动
```

`scripts/build.js` 按文件名顺序拼接这些片段，输出单文件 `app.js`。这样既保留了 `file://` 双击即用的发布方式，也避免了一个 60KB 的单文件难以维护。

```bash
npm run build          # 生成 app.js
npm run build:check    # CI 检查 app.js 是否与 src/ 同步
npm run test:unit      # 纯函数单元测试
npm run test:e2e       # 无依赖 CDP 冒烟测试
```

## 2. 启动流程

```
DOMContentLoaded
  → loadState()           读取 localStorage，失败则用 DEFAULT_DATA
  → renderEditor()        生成左侧表单
  → renderPreview()       生成 A4 画布
  → updateOverflowState() 计算内容高度与占用率
  → bindEvents()          绑定交互
```

状态只有一个：闭包内的 `state` 对象。任何修改都走：

```
setPath(state, path, value) → saveState() → scheduleRender() → render()
```

## 3. 数据模型

```json
{
  "version": 1,
  "template": "classic | sidebar | editorial | minimal",
  "accent": "#2563eb",
  "headerShape": "rounded | straight | arch",
  "showPhoto": true,
  "density": 96,
  "margin": "compact | standard | loose",
  "headerHeight": 177,
  "radius": 34,
  "cardRadius": 15,
  "sectionGap": 34,
  "lineHeight": 1.6,
  "workCardStyle": "dashed | soft | none",
  "photo": "headshot.svg 或 data:image/...",
  "basics": {
    "name": "", "role": "", "location": "", "phone": "", "email": "",
    "status": "", "gender": "", "hometown": "", "political": ""
  },
  "summary": { "lead": "", "bullets": [] },
  "experience": [{ "id": "", "org": "", "title": "", "date": "", "bullets": [] }],
  "projects":   [{ "id": "", "org": "", "title": "", "date": "", "bullets": [] }],
  "education":  [{ "id": "", "org": "", "title": "", "date": "", "right": "", "bullets": [] }],
  "skills":     [{ "name": "", "level": 1, "desc": "" }],
  "custom":     [{ "id": "", "title": "", "date": "", "content": "" }]
}
```

说明：

- `bullets` 支持极简富文本，仅允许 `<strong>`、`<em>`、`<br>`；
- `version` 用于后续迁移；
- `photo` 可以是相对路径，也可以是 data URL。

### 3.1 模板 DSL

模板与简历内容完全分离，只描述视觉：

```json
{
  "version": 1,
  "name": "蓝白经典 · 圆角头部",
  "page": { "size": "A4", "margin": "standard" },
  "theme": {
    "accent": "#2563eb",
    "headerShape": "rounded",
    "density": 96,
    "showPhoto": true,
    "headerHeight": 177,
    "radius": 34,
    "cardRadius": 15,
    "sectionGap": 34,
    "lineHeight": 1.6,
    "workCardStyle": "dashed"
  },
  "layout": { "template": "classic" }
}
```

- JSON Schema：`schema/resume-template.schema.json`
- 示例：`examples/demo-template.json`
- 代码：`src/60-template.js`
- 导入模板只应用样式，不覆盖简历内容；非法值会被归一化到安全默认值。

## 4. 渲染管线

```
state
  → headerHtml() / summaryHtml() / listSectionHtml() / skillsHtml() / customHtml()
  → bodyColumns()      根据 template 决定单栏或左右分栏
  → renderPreview()    写入 #resumeContent
  → CSS 变量注入       --accent / --header-height / --header-radius / --card-radius / --section-gap / --line-height
```

四种版式都复用同一棵 DOM，只通过 `data-template` 与 CSS 选择器改变外观。这样切换版式不会丢失编辑状态。

## 5. 一页适配

A4 画布固定为 `794 × 1123 px`（96 DPI）。

```
getContentHeight()     读取内容实际高度
占用率 = 内容高度 / 可用高度
溢出     = 内容高度 > 可用高度
autoFit()              在 density 80-112 区间二分/递减，找到最小可用值
```

`autoFit()` 只调整密度与间距，不改变字号语义层级，避免"压得太扁"。

## 6. 图片导入管线

```
选择图片
  → imagePalette()   Canvas 缩小到 320px，按 20 级色桶统计，选高饱和、中亮度主色
  → analyzeLayout()  Canvas 降采样，扫描头部行、右下圆角缺口、左右侧栏底色
  → classifyLayoutSignals() 映射模板 / 头部轮廓 / 密度 / 置信度
  → recognizeWithOcr() Tesseract.js（CDN）识别中英文
  → cleanOcrText()   去噪、合并断行
  → parseResumeText() 按栏目关键词切段
  → 用户校对
  → applyImportedStyle() 合并到 state
```

当前限制：本地版式识别无法完整理解复杂卡片与嵌套层级；可选 AI 会输出扩展后的 DSL，再由本地渲染器应用。

### 6.1 可选 AI 版式解析

```
用户点击 AI 精确解析
  → aiRequestFor()       按服务商构造 OpenAI / Anthropic 视觉请求
  → analyzeLayoutWithAi() 发送图片并读取严格 JSON
  → extractJsonObject()  容忍 Markdown 代码围栏，但拒绝无效 JSON
  → normalizeTemplate()  把所有字段限制在白名单与安全范围
  → applyTemplate()      只修改视觉状态，不覆盖简历正文
  → 继续 OCR 或仅套用样式
```

支持 OpenAI、OpenAI 兼容接口和 Anthropic Claude。API Key 默认只保存在内存，只有用户主动勾选后才写入 localStorage。AI 不会被页面加载、图片选择等隐式操作触发。

## 7. 导出管线

### PDF

`preparePrintRoot()` 克隆预览节点到 `#printRoot`，然后调用 `window.print()`。打印样式通过 `@media print` 固定 A4、零边距、隐藏工作台。

### 独立 HTML

`exportHtml()` 克隆预览 DOM，内嵌样式与 data URL 图片，下载为换机后仍可显示的单文件。

### JSON

直接序列化 `state`，用于跨设备备份与恢复。

## 8. 存储

| Key | 内容 | 上限风险 |
| --- | --- | --- |
| `resume-studio-data-v1` | 简历 JSON | 通常 < 100KB，安全 |
| `resume-studio-photo-v1` | 头像 data URL | 大图可能触发配额错误 |

图片过大时可能触发 localStorage 配额错误，界面会提示先导出 JSON 备份。

## 9. 已知限制

1. 本地版式识别仍以启发式为主，复杂卡片结构建议启用可选 AI；
2. 富文本仅支持少量标签；
3. 单页固定，无多页分页；
4. OCR 依赖 CDN，首次使用需联网；
5. 已有状态级撤销/重做，尚无区域拖拽和图层排序；
6. 仍无 TypeScript 类型检查，测试以关键纯函数与冒烟流程为主；
7. 离线 OCR 语言包尚未内置。

## 10. 演进方向

```
v0.2  模块化 + 测试 + 离线 OCR
v0.3  版面 DSL + 视觉模型适配层 + 模板编辑器
v0.4  多页 + DOCX + ATS/JD
v1.0  模板市场 + 分享 + 插件
```

核心原则：**模型只负责"理解"，本地负责"渲染"**。这样输出可复现、可测试、可离线。
