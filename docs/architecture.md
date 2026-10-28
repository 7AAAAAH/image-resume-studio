# 架构说明

## 1. 总体结构

这是一个无构建步骤的单页应用：

```
index.html      # 应用壳体：工具栏、编辑器容器、预览画布、弹窗
styles.css      # 工作台 UI + 四套简历版式 + 打印样式
app.js          # 状态、渲染、编辑、导入、导出、OCR
headshot.svg    # 示例头像
```

运行时没有框架、没有打包器。`app.js` 是一个 IIFE，内部按功能分区。

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

## 4. 渲染管线

```
state
  → headerHtml() / summaryHtml() / listSectionHtml() / skillsHtml() / customHtml()
  → bodyColumns()      根据 template 决定单栏或左右分栏
  → renderPreview()    写入 #resumeContent
  → CSS 变量注入       --accent / --accent-soft / --section-gap / --line-height
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
  → analyzeImage()   读取宽高比，映射模板与头部轮廓
  → recognizeWithOcr() Tesseract.js（CDN）识别中英文
  → cleanOcrText()   去噪、合并断行
  → parseResumeText() 按栏目关键词切段
  → 用户校对
  → applyImportedStyle() 合并到 state
```

当前限制：版式识别只用了宽高比，无法识别卡片、分栏、圆角。v0.3 将改为"视觉模型输出 DSL + 本地渲染"。

## 7. 导出管线

### PDF

`preparePrintRoot()` 克隆预览节点到 `#printRoot`，然后调用 `window.print()`。打印样式通过 `@media print` 固定 A4、零边距、隐藏工作台。

### 独立 HTML

`exportHtml()` 克隆预览 DOM，内嵌样式，下载为单独文件。当前会把相对图片路径转换为绝对 URL；v0.2 改为 data URL 内联。

### JSON

直接序列化 `state`，用于跨设备备份与恢复。

## 8. 存储

| Key | 内容 | 上限风险 |
| --- | --- | --- |
| `resume-studio-data-v1` | 简历 JSON | 通常 < 100KB，安全 |
| `resume-studio-photo-v1` | 头像 data URL | 大图可能触发配额错误 |

v0.2 将增加配额检测与压缩提示。

## 9. 已知限制

1. 版式识别为启发式，不是真正的版面理解；
2. 富文本仅支持少量标签；
3. 单页固定，无多页分页；
4. OCR 依赖 CDN，首次使用需联网；
5. 无撤销/重做，无拖拽排序；
6. 无自动化测试与类型检查。

## 10. 演进方向

```
v0.2  模块化 + 测试 + 离线 OCR
v0.3  版面 DSL + 视觉模型适配层 + 模板编辑器
v0.4  多页 + DOCX + ATS/JD
v1.0  模板市场 + 分享 + 插件
```

核心原则：**模型只负责"理解"，本地负责"渲染"**。这样输出可复现、可测试、可离线。