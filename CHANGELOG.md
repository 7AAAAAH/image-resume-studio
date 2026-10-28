# Changelog

所有重要变更都会记录在这里。格式参考 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)。

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
