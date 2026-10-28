# Changelog

所有重要变更都会记录在这里。格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)。

## [0.3.0-alpha.2] - 2026-10-28

### Added

- 可选 BYOK 视觉模型版式解析，支持 OpenAI、OpenAI 兼容接口与 Anthropic Claude；
- `••• > AI 设置`，Base URL、模型名、API Key 与服务商均可配置；
- 图片导入后可在“本地解析”和“AI 精确解析”之间明确选择；
- AI 模型只输出模板 DSL，再由本地渲染器应用，失败时保留启发式结果；
- AI 设置弹窗、缺失密钥不发请求的 E2E 测试；
- OpenAI / Claude 请求体、JSON 提取与安全默认值的单元测试。

### Security

- API Key 默认只保存在内存；只有主动勾选“在这台设备记住设置”后才写入 localStorage；
- AI 解析不会在页面加载或选择图片时自动触发，必须由用户点击按钮；
- 界面明确提示启用 AI 时图片会发送到所选服务商。

### Changed

- 单元测试增加到 18 个；
- 图片导入改为先展示本地分析结果，再选择是否进行 OCR 或 AI 解析。

## [0.3.0-alpha.1] - 2026-10-28

### Added

- 模板 DSL：`page` / `theme` / `layout` 三段式结构，样式与内容分离；
- `schema/resume-template.schema.json` JSON Schema；
- `examples/demo-template.json` 示例模板；
- `••• > 导出模板 / 导入模板` 入口；
- 模板导入时应用主色、头部轮廓、密度、页边距与头像显隐；
- 模板导出 / 导入的 E2E 测试。

### Changed

- 模板非法值会归一化到安全默认值，不会破坏当前简历内容；
- 单元测试增加到 14 个。

## [0.2.1] - 2026-10-28

### Added

- 启发式版式分析：检测头部高度、右下圆角、侧栏底色与置信度；
- 导入图片后显示识别结果（版式 / 头部轮廓 / 置信度）；
- E2E 测试覆盖圆角、直角、极简、侧栏四种合成版式。

### Changed

- 版式识别不再只依赖宽高比，改为多信号判断；
- 侧栏检测改为采样正文区域左右两侧的浅色底纹；
- 低置信度结果仍会应用，但会在导入状态中明示。

## [0.2.0] - 2026-10-28

### Added

- 将 60KB 的 `app.js` 拆分为 `src/` 下的 7 个源码模块；
- `scripts/build.js` 拼接构建，保持 `file://` 双击即用；
- 9 个纯函数单元测试；
- 无第三方依赖的 CDP 端到端冒烟测试；
- GitHub Actions 测试工作流；
- 示例头像改为内嵌 data URI，脱离外部文件也能导出。

### Fixed

- 独立 HTML 导出会内联图片，换机后不再丢失头像；
- `safeRich` 错误删除 `</strong>` 导致加粗失效；
- `normalizeData` 在部分导入时丢失默认联系方式；
- `setPath` 无法写入不存在的嵌套对象；
- JSON 导入的头像回退路径错误（`headshot.jpg`）。

### Changed

- README、CONTRIBUTING、架构文档补充构建与测试说明；
- 弹窗增加 `role="dialog"` 与 `aria-modal` 语义。

## [0.1.0] - 2026-10-28

### Added

- 从简历截图提取主色与版式特征；
- 浏览器 OCR 与人工校对；
- 四种简历版式：蓝白经典、左侧信息栏、编辑感留白、极简线条；
- 主色、内容密度、页边距、头部轮廓、头像显隐调节；
- 一页 A4 占用率检测与一键压缩；
- PDF、独立 HTML、JSON 导出；
- JSON 导入与 localStorage 自动保存；
- 开源仓库结构、文档与 GitHub Pages 部署。
