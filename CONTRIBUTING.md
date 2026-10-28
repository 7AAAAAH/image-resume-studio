# 贡献指南

感谢你愿意参与 Image Resume Studio。

## 本地运行

```bash
git clone https://github.com/7AAAAAH/image-resume-studio.git
cd image-resume-studio
```

- 直接双击 `index.html`；
- 或启动静态服务器：`python -m http.server 8080`。

## 修改源码

`app.js` 是由 `src/*.js` 拼接出的构建产物，请勿直接编辑。修改后运行：

```bash
npm run build
npm test
```

提交前请确保 `npm run build:check` 通过，且 `app.js` 与源码一致。

## 提交前检查

1. 用 Edge / Chrome / Firefox 各打开一次；
2. 编辑内容、切换四种版式、导出 JSON；
3. 打印预览确认为单页 A4、无溢出；
4. 确认没有把真实简历、真实手机号、邮箱、照片提交进仓库。

## 代码约定

- 原生 JavaScript，不使用框架；
- 公开函数使用小驼峰命名，内部工具函数放在文件顶部；
- 样式统一走 CSS 变量，避免硬编码颜色；
- 新增文案优先中文，必要时补英文；
- 提交信息使用 `feat:` / `fix:` / `docs:` / `refactor:` / `test:` / `chore:` 前缀。

## 数据与隐私

- 示例数据必须是虚构的；
- 不要在 Issue、截图、测试用例中出现真实个人信息；
- 需要复现问题时，请先脱敏。

## Pull Request

- 一个 PR 只做一件事；
- 描述里写清楚"改了什么、为什么、怎么验证"；
- 涉及版式的改动请附前后截图；
- 涉及导出的改动请附 PDF 或打印预览截图。

## Issue

- Bug 请附浏览器版本、复现步骤、截图；
- 功能建议请说明使用场景，而不只是"我想要 X"。
