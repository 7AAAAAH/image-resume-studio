/*! Image Resume Studio v0.3.0-alpha.4 | MIT | Generated from src/*.js - do not edit app.js directly. */
const EXPORT_CSS = "@import url(\"https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap\");\n\n:root {\n  --ink: #172237;\n  --muted: #6f7d93;\n  --quiet: #98a3b5;\n  --line: #dfe5ee;\n  --panel: #f7f9fc;\n  --canvas: #e8edf4;\n  --white: #ffffff;\n  --accent: #1f67ed;\n  --accent-soft: #edf3ff;\n  --shadow: 0 18px 55px rgba(35, 50, 77, 0.13), 0 2px 7px rgba(35, 50, 77, 0.06);\n  --font-ui: \"DM Sans\", \"Noto Sans SC\", sans-serif;\n  --font-cn: \"Noto Sans SC\", \"Microsoft YaHei\", sans-serif;\n}\n\n* { box-sizing: border-box; }\nhtml, body { min-height: 100%; }\nbody {\n  margin: 0;\n  color: var(--ink);\n  background: var(--canvas);\n  font-family: var(--font-ui);\n  -webkit-font-smoothing: antialiased;\n}\nbutton, input, select, textarea { font: inherit; }\nbutton { cursor: pointer; }\nbutton:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible {\n  outline: 3px solid rgba(31, 103, 237, .25);\n  outline-offset: 2px;\n}\n\n.app-shell { min-height: 100vh; display: flex; flex-direction: column; }\n.topbar {\n  height: 76px;\n  flex: 0 0 76px;\n  padding: 0 28px;\n  background: rgba(255,255,255,.94);\n  border-bottom: 1px solid #e6eaf1;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  position: relative;\n  z-index: 20;\n  backdrop-filter: blur(16px);\n}\n.brand { display: flex; align-items: center; gap: 12px; }\n.brand-mark {\n  width: 38px; height: 38px; border-radius: 12px;\n  background: #18263e;\n  display: flex; align-items: flex-end; justify-content: center; gap: 3px;\n  padding: 9px 8px;\n  box-shadow: inset 0 0 0 1px rgba(255,255,255,.08);\n}\n.brand-mark span { width: 4px; border-radius: 4px; background: #fff; display: block; }\n.brand-mark span:nth-child(1) { height: 10px; opacity: .55; }\n.brand-mark span:nth-child(2) { height: 16px; opacity: .8; }\n.brand-mark span:nth-child(3) { height: 21px; background: #7da9ff; }\n.brand-name { font-size: 13px; font-weight: 800; letter-spacing: .15em; }\n.brand-caption { font-family: var(--font-cn); color: #8a95a7; font-size: 11px; margin-top: 3px; }\n.topbar-actions { display: flex; align-items: center; gap: 9px; position: relative; }\n.save-state { display: flex; align-items: center; gap: 7px; color: #8995a7; font-family: var(--font-cn); font-size: 11px; margin-right: 10px; }\n.save-dot { width: 6px; height: 6px; border-radius: 50%; background: #45b883; box-shadow: 0 0 0 3px #e6f8ef; }\n.history-controls { display: flex; align-items: center; gap: 2px; margin-right: 4px; padding-right: 12px; border-right: 1px solid #e2e7ef; }\n.history-button {\n  width: 29px; height: 29px; border: 0; border-radius: 7px; background: transparent;\n  color: #65758c; font-family: var(--font-ui); font-size: 18px; line-height: 1;\n}\n.history-button:hover:not(:disabled) { background: #edf2f8; color: #26364e; }\n.history-button:disabled { opacity: .28; cursor: default; }\n.button {\n  min-height: 38px; border-radius: 10px; padding: 0 15px; border: 1px solid transparent;\n  font-family: var(--font-cn); font-size: 12px; font-weight: 600;\n  display: inline-flex; align-items: center; justify-content: center; gap: 7px;\n  transition: transform .16s ease, background .16s ease, border-color .16s ease;\n}\n.button:hover { transform: translateY(-1px); }\n.button-primary { background: #1d2b43; color: #fff; box-shadow: 0 5px 12px rgba(23,34,55,.15); }\n.button-primary:hover { background: #263955; }\n.button-quiet { background: #fff; border-color: #dfe5ee; color: #3f4c61; }\n.button-quiet:hover { border-color: #b9c5d7; background: #fafcff; }\n.button-more { width: 38px; padding: 0; background: transparent; color: #8995a7; font-size: 17px; letter-spacing: 1px; }\n.button-icon { font-size: 16px; font-weight: 400; }\n.menu {\n  position: absolute; right: 0; top: 48px; width: 174px; padding: 6px;\n  background: #fff; border: 1px solid #e3e8ef; border-radius: 12px; box-shadow: var(--shadow);\n}\n.menu button {\n  display: block; width: 100%; text-align: left; border: 0; background: transparent;\n  padding: 9px 10px; border-radius: 7px; color: #435067; font-family: var(--font-cn); font-size: 12px;\n}\n.menu button:hover { background: #f4f7fb; }\n\n.workspace { display: flex; min-height: 0; flex: 1; }\n.sidebar {\n  width: 334px; flex: 0 0 334px; height: calc(100vh - 76px);\n  overflow-y: auto; overflow-x: hidden;\n  padding: 26px 22px 20px;\n  background: #f7f9fc;\n  border-right: 1px solid #e1e7ef;\n  scrollbar-width: thin; scrollbar-color: #c9d2df transparent;\n}\n.sidebar::-webkit-scrollbar { width: 6px; }\n.sidebar::-webkit-scrollbar-thumb { background: #c9d2df; border-radius: 4px; }\n.sidebar-heading { display: flex; justify-content: space-between; align-items: flex-start; padding: 0 3px; }\n.eyebrow, .modal-eyebrow { font-size: 9px; font-weight: 800; letter-spacing: .18em; color: #95a0b1; }\n.sidebar-heading h1 { font-family: var(--font-cn); font-size: 21px; line-height: 1.2; margin: 6px 0 0; letter-spacing: -.02em; }\n.draft-badge {\n  margin-top: 3px; font-family: var(--font-cn); font-size: 10px; color: #758399;\n  background: #eef2f7; border-radius: 20px; padding: 4px 8px;\n}\n.step-nav {\n  display: flex; gap: 4px; padding: 5px; background: #edf1f6; border-radius: 11px; margin: 21px 0 24px;\n}\n.step {\n  flex: 1; border: 0; background: transparent; border-radius: 8px; color: #8994a6;\n  font-family: var(--font-cn); font-size: 10px; font-weight: 500; padding: 8px 2px;\n  display: flex; flex-direction: column; align-items: center; gap: 4px;\n}\n.step-number { font-family: var(--font-ui); font-size: 9px; letter-spacing: .05em; }\n.step.is-active { background: #fff; color: #273750; box-shadow: 0 2px 7px rgba(30,48,75,.08); }\n.step.is-active .step-number { color: #1f67ed; }\n.panel-section { animation: panelIn .25s ease; }\n@keyframes panelIn { from { opacity: .3; transform: translateY(4px); } to { opacity: 1; transform: none; } }\n.section-title-row { display: flex; align-items: center; justify-content: space-between; padding: 0 3px 10px; }\n.section-title-row h2 { font-family: var(--font-cn); font-size: 13px; margin: 0; font-weight: 700; }\n.text-button { border: 0; background: transparent; padding: 2px 0; color: #8390a3; font-family: var(--font-cn); font-size: 10px; }\n.text-button:hover { color: #1f67ed; }\n.micro-label { color: #9ba5b4; font-family: var(--font-cn); font-size: 10px; }\n.editor-list { display: flex; flex-direction: column; gap: 8px; }\n.editor-group { border: 1px solid #e2e8f0; border-radius: 10px; background: #fff; overflow: hidden; }\n.editor-group.is-open { border-color: #d5deeb; box-shadow: 0 3px 10px rgba(36,54,82,.04); }\n.group-head {\n  width: 100%; padding: 11px 11px; display: flex; align-items: center; gap: 9px;\n  border: 0; background: #fff; text-align: left; color: #39465b; font-family: var(--font-cn); font-size: 12px; font-weight: 600;\n}\n.group-head:hover { background: #fbfcfe; }\n.group-icon {\n  width: 24px; height: 24px; border-radius: 7px; background: #eff3f9; color: #64758c;\n  display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700;\n}\n.group-head.is-current .group-icon { background: #e9f1ff; color: #1f67ed; }\n.group-head .group-count { margin-left: auto; color: #a5afbd; font-family: var(--font-ui); font-size: 10px; font-weight: 500; }\n.group-chevron { color: #a4afbd; font-size: 11px; transition: transform .2s ease; }\n.editor-group.is-open .group-chevron { transform: rotate(180deg); }\n.group-body { display: none; padding: 0 11px 13px; border-top: 1px solid #edf0f5; }\n.editor-group.is-open .group-body { display: block; }\n.field-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; margin-top: 12px; }\n.field { display: flex; flex-direction: column; gap: 5px; }\n.field.is-wide { grid-column: 1 / -1; }\n.field-label { color: #8d98a9; font-family: var(--font-cn); font-size: 9px; }\n.field input, .field textarea, .field select {\n  width: 100%; border: 1px solid #e1e7ef; border-radius: 7px; background: #fbfcfe;\n  color: #3c4a60; -webkit-text-fill-color: #3c4a60; font-family: var(--font-cn); font-size: 11px; padding: 8px 9px;\n  transition: border .15s ease, background .15s ease;\n}\n.field textarea { resize: vertical; min-height: 64px; line-height: 1.55; }\n.field input:hover, .field textarea:hover, .field select:hover { background: #fff; }\n.field input:focus, .field textarea:focus, .field select:focus { background: #fff; border-color: #8fb2f4; }\n.photo-field-row { display: flex; align-items: center; gap: 10px; margin-top: 12px; }\n.photo-thumb {\n  width: 42px; height: 47px; object-fit: cover; object-position: top; border-radius: 6px; background: #eff2f6;\n}\n.mini-action { border: 1px solid #dfe6ef; border-radius: 7px; background: #fff; padding: 7px 9px; color: #65748a; font-family: var(--font-cn); font-size: 10px; }\n.item-card { padding: 11px 0; border-top: 1px dashed #e4e9f0; }\n.item-card:first-of-type { border-top: 0; }\n.item-card-head { display: flex; justify-content: space-between; align-items: center; color: #66758b; font-family: var(--font-cn); font-size: 10px; font-weight: 600; margin-top: 10px; }\n.item-actions { display: flex; gap: 3px; }\n.item-actions button { border: 0; background: transparent; color: #a1acba; font-size: 11px; padding: 3px 4px; }\n.item-actions button:hover { color: #1f67ed; }\n.add-item, .add-section {\n  width: 100%; border: 1px dashed #d5dee9; border-radius: 8px; background: transparent;\n  color: #8190a3; font-family: var(--font-cn); font-size: 10px; padding: 8px; margin-top: 9px;\n}\n.add-item:hover, .add-section:hover { color: #1f67ed; border-color: #a9c3f2; background: #fafdff; }\n.add-section { margin-top: 11px; padding: 10px; background: #fff; }\n.preset-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; margin-bottom: 20px; }\n.preset-card {\n  padding: 8px; border: 1px solid #e2e8f0; border-radius: 9px; background: #fff; text-align: left;\n}\n.preset-card:hover { border-color: #b8c9e2; }\n.preset-card.is-active { border-color: #1f67ed; box-shadow: 0 0 0 2px #e6efff; }\n.preset-thumb { height: 65px; border-radius: 5px; overflow: hidden; position: relative; background: #f4f6f9; }\n.preset-thumb::before { content: \"\"; position: absolute; left: 0; right: 0; top: 0; height: 22px; background: var(--preset-accent, #1f67ed); }\n.preset-thumb::after {\n  content: \"\"; position: absolute; left: 7px; right: 7px; top: 30px; height: 3px;\n  background: repeating-linear-gradient(to bottom, #cfd8e4 0 3px, transparent 3px 8px);\n  box-shadow: 0 12px 0 #dae2ec, 0 24px 0 #dae2ec;\n}\n.preset-card:nth-child(2) .preset-thumb::before { width: 28%; height: 100%; right: auto; border-radius: 0; }\n.preset-card:nth-child(2) .preset-thumb::after { left: 36%; background: repeating-linear-gradient(to bottom, #cfd8e4 0 3px, transparent 3px 8px); box-shadow: 0 12px 0 #dae2ec, 0 24px 0 #dae2ec; }\n.preset-card:nth-child(3) .preset-thumb::before { height: 100%; width: 100%; clip-path: polygon(0 0,100% 0,100% 68%,0 100%); }\n.preset-card:nth-child(4) .preset-thumb::before { left: 8px; top: 8px; right: 8px; height: 17px; border-radius: 4px; }\n.preset-card:nth-child(4) .preset-thumb::after { top: 32px; }\n.preset-card span { display: block; font-family: var(--font-cn); font-size: 10px; color: #5f6e82; margin: 7px 1px 1px; }\n.control-block { padding: 0 3px; margin-bottom: 17px; }\n.control-label { display: flex; justify-content: space-between; color: #69788c; font-family: var(--font-cn); font-size: 10px; margin-bottom: 8px; }\n.control-label span { color: #9ba6b5; }\n.color-row { display: flex; align-items: center; gap: 9px; }\ninput[type=\"color\"] { width: 35px; height: 28px; border: 1px solid #dfe5ee; border-radius: 6px; padding: 2px; background: #fff; }\n.swatch-list { display: flex; gap: 6px; }\n.swatch { width: 17px; height: 17px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 0 1px #e0e6ee; }\n.swatch.is-active { box-shadow: 0 0 0 2px var(--ink); }\ninput[type=\"range\"] { width: 100%; accent-color: #1f67ed; height: 4px; }\nselect { border: 1px solid #dfe5ee; border-radius: 7px; background: #fff; color: #5f6e82; padding: 8px 9px; font-family: var(--font-cn); font-size: 11px; width: 100%; }\n.switch-row { display: flex; align-items: center; justify-content: space-between; padding: 12px 3px; border-top: 1px solid #e7ecf3; color: #69788c; font-family: var(--font-cn); font-size: 10px; }\n.switch-row input { position: absolute; opacity: 0; }\n.switch { width: 31px; height: 18px; border-radius: 20px; background: #d7dee8; position: relative; transition: .18s ease; }\n.switch::after { content: \"\"; width: 14px; height: 14px; border-radius: 50%; background: #fff; position: absolute; top: 2px; left: 2px; transition: .18s ease; box-shadow: 0 1px 2px #aab4c2; }\n.switch-row input:checked + .switch { background: #1f67ed; }\n.switch-row input:checked + .switch::after { transform: translateX(13px); }\n.fit-status { font-family: var(--font-cn); font-size: 9px; padding: 4px 7px; border-radius: 12px; background: #e9f8f1; color: #27825d; }\n.fit-status.warn { background: #fff3dd; color: #a26914; }\n.fit-visual { display: flex; align-items: center; gap: 17px; padding: 10px 3px 20px; }\n.mini-page { width: 93px; height: 132px; background: #fff; border-radius: 3px; box-shadow: 0 6px 15px rgba(30,48,75,.1); padding: 7px; border-top: 14px solid #dce9ff; }\n.mini-header { height: 5px; width: 54%; background: #8fb4f8; border-radius: 2px; margin-bottom: 12px; }\n.mini-line { height: 3px; background: #dfe6ee; border-radius: 2px; margin: 7px 0; }\n.w90 { width: 90%; } .w100 { width: 100%; } .w76 { width: 76%; } .w95 { width: 95%; } .w84 { width: 84%; } .w98 { width: 98%; } .w72 { width: 72%; }\n.fit-visual-copy { display: flex; flex-direction: column; gap: 4px; }\n.fit-visual-copy strong { font-size: 24px; letter-spacing: -.04em; }\n.fit-visual-copy span { font-family: var(--font-cn); font-size: 10px; color: #8995a7; }\n.button-wide { width: 100%; }\n.sparkle { color: #b7ceff; }\n.hint-box { border: 1px solid #e0e8f3; background: #f0f5fc; border-radius: 9px; padding: 11px 12px; margin: 13px 0 17px; }\n.hint-box strong { font-family: var(--font-cn); font-size: 10px; color: #52647c; }\n.hint-box p { font-family: var(--font-cn); font-size: 9px; line-height: 1.65; color: #8391a4; margin: 5px 0 0; }\n.token-panel {\n  margin: 4px 0 17px; padding: 13px 12px 11px; border: 1px solid #e2e9f2;\n  border-radius: 11px; background: #fbfcfe;\n}\n.token-panel-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; margin-bottom: 11px; }\n.token-panel-head > div { display: flex; flex-direction: column; gap: 2px; }\n.token-panel-head strong { color: #4a5c73; font-family: var(--font-cn); font-size: 10px; }\n.token-panel-head span { color: #9aa6b6; font-family: var(--font-cn); font-size: 8px; }\n.token-control {\n  display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 6px 10px;\n  margin-top: 9px; color: #77869a; font-family: var(--font-cn); font-size: 9px;\n}\n.token-control output { color: #3d6fbf; font-family: var(--font-ui); font-size: 9px; font-weight: 600; }\n.token-control input[type=\"range\"] { grid-column: 1 / -1; margin: 0; }\n.token-select { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 11px; color: #77869a; font-family: var(--font-cn); font-size: 9px; }\n.token-select select {\n  min-width: 105px; border: 1px solid #dfe6f0; border-radius: 7px; background: #fff;\n  color: #4c5c72; padding: 5px 7px; font-family: var(--font-cn); font-size: 9px;\n}\n.sidebar-footer { margin-top: 24px; padding: 14px 3px 0; border-top: 1px solid #e5eaf1; }\n.privacy-note, .shortcut-note { font-family: var(--font-cn); font-size: 9px; color: #99a4b4; line-height: 1.7; }\n.shield { color: #6fa486; margin-right: 4px; }\n\n.preview-area { min-width: 0; flex: 1; display: flex; flex-direction: column; background: #e9eef5; position: relative; }\n.preview-area::before {\n  content: \"\"; position: absolute; inset: 0; pointer-events: none;\n  background-image: radial-gradient(rgba(109,126,151,.17) .65px, transparent .65px);\n  background-size: 15px 15px; opacity: .35;\n}\n.preview-toolbar {\n  position: relative; z-index: 2; height: 52px; flex: 0 0 52px;\n  padding: 0 27px; display: flex; align-items: center; justify-content: space-between;\n  border-bottom: 1px solid rgba(210,219,231,.8); background: rgba(247,249,252,.68); backdrop-filter: blur(10px);\n}\n.preview-title { display: flex; align-items: center; gap: 8px; color: #5f6f85; font-family: var(--font-cn); font-size: 11px; }\n.status-dot { width: 6px; height: 6px; border-radius: 50%; background: #2ab37c; box-shadow: 0 0 0 3px rgba(42,179,124,.12); }\n.a4-label { color: #a0abb9; font-family: var(--font-ui); font-size: 9px; margin-left: 4px; }\n.preview-tools { display: flex; align-items: center; gap: 4px; }\n.icon-button { width: 27px; height: 27px; border: 1px solid transparent; border-radius: 6px; background: transparent; color: #78879b; font-size: 14px; display: flex; align-items: center; justify-content: center; }\n.icon-button:hover { background: #fff; border-color: #dce3ed; }\n.zoom-label { font-size: 10px; color: #7c8a9d; min-width: 34px; text-align: center; }\n.tool-divider { width: 1px; height: 17px; background: #d9e0ea; margin: 0 4px; }\n.paper-stage { position: relative; z-index: 1; flex: 1; overflow: auto; padding: 28px 35px 50px; display: flex; justify-content: center; align-items: flex-start; scrollbar-width: thin; scrollbar-color: #bdc8d7 transparent; }\n.paper-stage::-webkit-scrollbar { width: 8px; height: 8px; }\n.paper-stage::-webkit-scrollbar-thumb { background: #bdc8d7; border-radius: 8px; }\n.paper-scaler { transform-origin: top center; transition: transform .16s ease; }\n.resume-page {\n  width: 794px; height: 1123px; min-height: 1123px; background: #fff; position: relative; overflow: hidden;\n  box-shadow: 0 25px 60px rgba(36,51,76,.16), 0 2px 5px rgba(36,51,76,.08);\n  color: #202833; font-family: var(--font-cn);\n}\n.resume-content { width: 100%; height: 100%; position: relative; }\n.resume-page.is-editing { outline: 2px solid rgba(31,103,237,.22); outline-offset: 4px; }\n.stage-footer {\n  position: relative; z-index: 2; height: 30px; flex: 0 0 30px; padding: 0 28px;\n  display: flex; align-items: center; justify-content: space-between;\n  background: rgba(247,249,252,.72); color: #96a2b1; font-family: var(--font-cn); font-size: 9px;\n}\n.live-pulse { display: inline-block; width: 5px; height: 5px; border-radius: 50%; background: #50b78c; margin-right: 5px; }\n\n.resume-content { --accent: #2563eb; --resume-scale: 1; --section-gap: 33px; --line-height: 1.6; }\n.resume-header {\n  min-height: var(--header-height, 177px); position: relative; overflow: hidden;\n  background: #fff; color: #fff; padding: 0 0 0 23px;\n  display: flex; align-items: flex-start; gap: 30px;\n}\n.resume-header::after { display: none; }\n.header-rounded .resume-header {\n  background: #fff;\n}\n.header-rounded .resume-header::before {\n  content: \"\"; position: absolute; left: 167px; top: 0; right: 0; bottom: 0;\n  background: var(--accent); border-bottom-left-radius: var(--header-radius, 34px);\n}\n.header-rounded .header-identity { margin-left: 4px; }\n.header-straight .resume-header { background: var(--accent); padding-left: 22px; }\n.header-straight .resume-header::before { display: none; }\n.header-straight .photo-frame { background: #fff; }\n.header-arch .resume-header { background: var(--accent); }\n.header-arch .resume-header::before { display: none; }\n.header-straight .resume-header { border-radius: 0; }\n.header-arch .resume-header { border-radius: 0 0 32% 0 / 0 0 13% 0; }\n.photo-frame {\n  width: 129px; height: 145px; flex: 0 0 129px; border-radius: 0; overflow: hidden;\n  background: #fff; border: 0; box-shadow: none; position: relative; z-index: 2; margin-top: 17px;\n}\n.photo-frame img { width: 100%; height: 100%; display: block; object-fit: contain; object-position: center bottom; }\n.photo-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: 700; opacity: .8; }\n.header-identity { min-width: 0; position: relative; z-index: 2; flex: 1; padding: 18px 24px 12px 0; color: #fff; }\n.resume-name { font-size: 32px; line-height: 1.05; font-weight: 800; letter-spacing: .02em; margin: 0 0 8px; }\n.resume-role { font-size: 15px; font-weight: 500; color: rgba(255,255,255,.96); margin: 0 0 12px; letter-spacing: .01em; }\n.contact-grid { display: grid; grid-template-columns: 86px 104px 143px minmax(0, 1fr); gap: 7px 10px; max-width: 490px; }\n.contact-item { font-size: 9px; color: rgba(255,255,255,.92); display: flex; gap: 3px; line-height: 1.35; min-width: 0; white-space: nowrap; }\n.contact-item .label { color: rgba(255,255,255,.7); flex: 0 0 auto; }\n.contact-item .value { overflow-wrap: anywhere; }\n.contact-grid .contact-item:nth-child(1) { grid-column: 1; }\n.contact-grid .contact-item:nth-child(2) { grid-column: 2; }\n.contact-grid .contact-item:nth-child(3) { grid-column: 3; }\n.contact-grid .contact-item:nth-child(4) { grid-column: 4; }\n.contact-grid .contact-item:nth-child(4) { justify-self: end; }\n.header-extra { margin-top: 8px; display: flex; flex-wrap: wrap; gap: 5px 24px; }\n.header-extra span { font-size: 10.5px; color: rgba(255,255,255,.88); }\n.header-extra b { color: rgba(255,255,255,.65); font-weight: 400; margin-right: 3px; }\n.resume-main { padding: 14px 29px 16px; }\n.resume-section { margin-top: var(--section-gap); }\n.resume-section:first-child { margin-top: 0; }\n.section-heading { display: flex; align-items: center; gap: 0; height: 23px; position: relative; margin-bottom: 7px; }\n.section-heading::after { content: \"\"; position: absolute; height: 100%; left: 0; right: 0; border-radius: 999px; background: #edf1fc; opacity: 1; }\n.section-tab {\n  position: relative; z-index: 1; height: 23px; min-width: 95px; border-radius: 999px;\n  background: var(--accent); color: #fff; display: inline-flex; align-items: center; justify-content: center;\n  padding: 0 17px; font-size: 10px; font-weight: 700; letter-spacing: .04em;\n}\n.section-heading-line { display: none; }\n.summary-lead { font-size: 11.4px; font-weight: 600; line-height: var(--line-height); margin: 0 0 4px; color: #27313d; }\n.bullet-list { list-style: none; padding: 0; margin: 0; }\n.bullet-list li { position: relative; font-size: 10.9px; line-height: var(--line-height); color: #4d5867; padding-left: 11px; margin: 2px 0; }\n.bullet-list li::before { content: \"•\"; position: absolute; left: 1px; top: 0; color: #374151; font-size: 8px; }\n.bullet-list strong { color: #293442; font-weight: 800; }\n.entry { margin-bottom: 19px; }\n.entry:last-child { margin-bottom: 0; }\n.entry-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 15px; }\n.entry-org { font-size: 11.7px; font-weight: 700; color: #27313e; line-height: 1.4; }\n.entry-date { flex: 0 0 auto; font-size: 8px; color: #344154; line-height: 1.3; white-space: nowrap; font-family: var(--font-ui); font-weight: 600; }\n.entry-subhead { display: flex; justify-content: space-between; gap: 10px; color: #4f5d6f; font-size: 9.2px; line-height: 1.4; margin-top: 1px; }\n.entry-subhead .right { flex: 0 0 auto; font-size: 8px; }\n.entry-title { color: #4f5d6f; font-size: 8.8px; margin-top: 1px; }\n.skill-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }\n.skill-card { min-width: 0; }\n.skill-name { font-size: 9.3px; color: #344154; font-weight: 700; margin-bottom: 5px; }\n.skill-dots { display: flex; gap: 3px; margin-bottom: 4px; }\n.skill-dot { width: 6px; height: 6px; border-radius: 50%; background: #d9e1ec; }\n.skill-dot.on { background: var(--accent); }\n.skill-desc { font-size: 8.1px; color: #687586; line-height: 1.4; }\n.section-custom .entry-org { font-size: 10px; }\n\n.resume-page[data-template=\"sidebar\"] .resume-header { min-height: var(--header-height, 180px); padding: 27px 32px 20px; border-radius: 0; }\n.resume-page[data-template=\"sidebar\"] .resume-main { display: grid; grid-template-columns: 1fr 218px; gap: 22px; padding-top: 20px; }\n.resume-page[data-template=\"sidebar\"] .resume-section { margin-top: 17px; }\n.resume-page[data-template=\"sidebar\"] .main-column { min-width: 0; }\n.resume-page[data-template=\"sidebar\"] .side-column { padding-left: 16px; border-left: 1px solid #dbe4ef; }\n.resume-page[data-template=\"sidebar\"] .side-column .section-heading::after { background: #f0f4fa; }\n.resume-page[data-template=\"sidebar\"] .side-column .section-tab { min-width: 75px; font-size: 10px; padding: 0 12px; }\n.resume-page[data-template=\"sidebar\"] .side-column .skill-grid { grid-template-columns: 1fr; gap: 12px; }\n.resume-page[data-template=\"sidebar\"] .side-column .bullet-list li { font-size: 9px; }\n\n.resume-page[data-template=\"editorial\"] .resume-header {\n  background: #f4f7fb; color: #1e2a3a; min-height: var(--header-height, 174px); padding: 28px 34px;\n  border-bottom: 1px solid #dbe4ee; border-radius: 0;\n}\n.resume-page[data-template=\"editorial\"] .resume-header::after { border: 1px solid var(--accent); background: transparent; opacity: .18; }\n.resume-page[data-template=\"editorial\"] .resume-name { font-size: 32px; letter-spacing: .06em; }\n.resume-page[data-template=\"editorial\"] .resume-role { color: #62738a; }\n.resume-page[data-template=\"editorial\"] .contact-item, .resume-page[data-template=\"editorial\"] .header-extra span { color: #526276; }\n.resume-page[data-template=\"editorial\"] .contact-item .label, .resume-page[data-template=\"editorial\"] .header-extra b { color: #8e9cac; }\n.resume-page[data-template=\"editorial\"] .photo-frame { border-color: #fff; box-shadow: 0 4px 14px rgba(39,55,76,.12); }\n.resume-page[data-template=\"editorial\"] .resume-main { padding-top: 18px; }\n.resume-page[data-template=\"editorial\"] .section-heading::after { background: transparent; border-top: 1px solid #dbe4ee; height: 1px; top: 50%; opacity: 1; }\n.resume-page[data-template=\"editorial\"] .section-tab { background: transparent; color: #27364a; padding: 0 16px 0 0; justify-content: flex-start; }\n.resume-page[data-template=\"editorial\"] .section-tab::after { content: \"\"; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); position: absolute; left: -3px; top: 9px; }\n.resume-page[data-template=\"editorial\"] .section-heading { padding-left: 10px; }\n\n.resume-page[data-template=\"minimal\"] .resume-header { background: #fff; color: #1e2a3a; border-radius: 0; min-height: var(--header-height, 164px); padding: 28px 31px 18px; border-bottom: 3px solid var(--accent); }\n.resume-page[data-template=\"minimal\"] .resume-header::after { display: none; }\n.resume-page[data-template=\"minimal\"] .resume-name { font-size: 29px; letter-spacing: .08em; }\n.resume-page[data-template=\"minimal\"] .resume-role { color: var(--accent); margin-bottom: 12px; }\n.resume-page[data-template=\"minimal\"] .contact-item, .resume-page[data-template=\"minimal\"] .header-extra span { color: #566577; }\n.resume-page[data-template=\"minimal\"] .contact-item .label, .resume-page[data-template=\"minimal\"] .header-extra b { color: #96a1af; }\n.resume-page[data-template=\"minimal\"] .photo-frame { border-color: #e1e7ef; box-shadow: none; }\n.resume-page[data-template=\"minimal\"] .section-heading::after { display: none; }\n.resume-page[data-template=\"minimal\"] .section-tab { color: #29364a; background: transparent; padding: 0; min-width: auto; border-bottom: 2px solid var(--accent); border-radius: 0; }\n.resume-page[data-template=\"minimal\"] .section-heading-line { color: #aab4c0; }\n.resume-page[data-template=\"minimal\"] .section-heading { height: 23px; margin-bottom: 7px; }\n\n.resume-page[data-template=\"classic\"] .section-experience {\n  margin-left: -12px;\n  margin-right: -12px;\n  padding: 5px 14px 12px;\n  border: 1.5px dashed var(--accent);\n  border-radius: var(--card-radius, 15px);\n  background: #fff;\n  box-shadow: 0 4px 10px rgba(37, 99, 235, .04);\n}\n.resume-page[data-template=\"classic\"][data-work-card=\"soft\"] .section-experience {\n  border-style: solid;\n  border-color: color-mix(in srgb, var(--accent) 22%, #ffffff);\n  background: linear-gradient(145deg, var(--accent-soft) 0%, #ffffff 72%);\n  box-shadow: 0 8px 22px color-mix(in srgb, var(--accent) 8%, transparent);\n}\n.resume-page[data-template=\"classic\"][data-work-card=\"none\"] .section-experience {\n  margin-left: 0;\n  margin-right: 0;\n  padding: 0;\n  border: 0;\n  background: transparent;\n  box-shadow: none;\n}\n.resume-page[data-template=\"classic\"] .section-experience .bullet-list li {\n  font-size: 9.8px;\n}\n.resume-page[data-template=\"classic\"] .section-experience .entry-org {\n  font-size: 10.8px;\n}\n.resume-page[data-template=\"classic\"] .section-experience .entry {\n  margin-bottom: 11px;\n}\n.resume-page[data-template=\"classic\"] .section-experience .section-heading {\n  margin-top: 0;\n}\n.resume-page[data-template=\"classic\"] .section-experience .section-heading::after {\n  background: #eef2fd;\n}\n.resume-page[data-template=\"classic\"] .section-experience .entry {\n  padding-left: 1px;\n}\n.resume-page[data-template=\"classic\"] .section-projects,\n.resume-page[data-template=\"classic\"] .section-education,\n.resume-page[data-template=\"classic\"] .section-skills {\n  border-radius: 9px;\n}\n.resume-page[data-template=\"classic\"] .section-summary {\n  border-radius: 9px;\n}\n.resume-page[data-template=\"classic\"] .resume-main {\n  padding-top: 14px;\n}\n.resume-page[data-template=\"classic\"] .resume-header {\n  border-bottom-right-radius: var(--header-radius, 31px);\n  border-bottom-left-radius: 0;\n}\n.resume-page[data-template=\"classic\"] .photo-frame { margin-left: 0; }\n\n.paper-stage.is-fullscreen { position: fixed; inset: 0; z-index: 50; background: #dfe6ef; padding: 50px 30px; }\n.paper-stage.is-fullscreen .paper-scaler { margin-top: 0; }\n.paper-stage.is-fullscreen::after {\n  content: \"ESC 退出全屏\"; position: fixed; top: 17px; left: 50%; transform: translateX(-50%);\n  color: #748196; background: rgba(255,255,255,.9); border: 1px solid #d4dde9; padding: 6px 12px;\n  border-radius: 20px; font-family: var(--font-cn); font-size: 10px;\n}\n\n.modal-backdrop {\n  position: fixed; inset: 0; z-index: 100; background: rgba(20,30,46,.55);\n  display: flex; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(5px);\n}\n.modal-backdrop[hidden] { display: none; }\n.modal {\n  width: min(540px, 100%); max-height: calc(100vh - 40px); overflow-y: auto; position: relative;\n  background: #fff; border-radius: 17px; padding: 29px 30px 23px;\n  box-shadow: 0 30px 80px rgba(12,25,45,.3); animation: modalIn .22s ease;\n}\n@keyframes modalIn { from { opacity: 0; transform: translateY(8px) scale(.98); } to { opacity: 1; transform: none; } }\n.modal-narrow { width: min(670px, 100%); }\n.modal-close { position: absolute; top: 14px; right: 16px; border: 0; background: transparent; color: #a0aab7; font-size: 22px; line-height: 1; padding: 5px; }\n.modal-close:hover { color: #27364a; }\n.modal h2 { font-family: var(--font-cn); font-size: 21px; letter-spacing: -.02em; margin: 7px 0 8px; }\n.modal-lead { font-family: var(--font-cn); color: #7a879a; font-size: 11px; line-height: 1.75; margin: 0 0 19px; max-width: 450px; }\n.drop-zone {\n  border: 1.5px dashed #bfd0e6; border-radius: 12px; background: #f7faff;\n  min-height: 150px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 7px;\n  color: #6e7d91; cursor: pointer; transition: .17s ease; text-align: center; padding: 18px;\n}\n.drop-zone:hover, .drop-zone.is-over { border-color: #5d91e9; background: #f0f6ff; }\n.drop-icon { width: 35px; height: 35px; border-radius: 50%; background: #e9f1ff; color: #3474dd; font-size: 20px; display: flex; align-items: center; justify-content: center; margin-bottom: 2px; }\n.drop-zone strong { font-family: var(--font-cn); color: #53647b; font-size: 12px; }\n.drop-zone span { font-family: var(--font-cn); color: #98a4b4; font-size: 10px; }\n.import-options { margin: 17px 0 15px; border-top: 1px solid #eef1f5; }\n.option-row { display: flex; gap: 9px; align-items: flex-start; padding: 12px 0 0; cursor: pointer; }\n.option-row input { position: absolute; opacity: 0; }\n.checkbox-ui { width: 15px; height: 15px; flex: 0 0 15px; border: 1px solid #cbd6e4; border-radius: 4px; background: #fff; margin-top: 1px; position: relative; }\n.option-row input:checked + .checkbox-ui { background: #1f67ed; border-color: #1f67ed; }\n.option-row input:checked + .checkbox-ui::after { content: \"✓\"; color: #fff; font-size: 10px; position: absolute; left: 2px; top: -2px; }\n.option-row span:last-child { display: flex; flex-direction: column; gap: 3px; }\n.option-row strong { font-family: var(--font-cn); font-weight: 600; color: #59697e; font-size: 11px; }\n.option-row small { font-family: var(--font-cn); font-weight: 400; color: #9aa5b4; font-size: 9px; }\n.import-result-actions {\n  display: flex; align-items: center; justify-content: space-between; gap: 18px;\n  padding: 13px 14px; margin: 14px 0 0; border: 1px solid #dce8f8;\n  border-radius: 11px; background: linear-gradient(135deg, #f5f9ff 0%, #eef5ff 100%);\n}\n.import-result-actions[hidden] { display: none; }\n.import-result-actions > div:first-child { min-width: 0; display: flex; flex-direction: column; gap: 3px; }\n.import-result-actions strong { color: #425a78; font-family: var(--font-cn); font-size: 10px; }\n.import-result-actions small { color: #8495aa; font-family: var(--font-cn); font-size: 9px; line-height: 1.55; }\n.import-result-buttons { display: flex; align-items: center; gap: 7px; flex: 0 0 auto; }\n.button-ai {\n  color: #fff; border-color: transparent;\n  background: linear-gradient(135deg, #2e6ee9 0%, #1d58c7 100%);\n  box-shadow: 0 5px 13px rgba(31, 103, 237, .2);\n}\n.button-ai:hover { color: #fff; border-color: transparent; box-shadow: 0 7px 17px rgba(31, 103, 237, .27); }\n.button-ai:disabled { cursor: wait; opacity: .6; }\n.ai-form { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }\n.ai-form .field.is-wide { grid-column: 1 / -1; }\n.ai-form .field input, .ai-form .field select { background: #fbfcfe; }\n.ai-remember { margin-top: 3px; padding-top: 12px; border-top: 1px solid #eef1f5; }\n.privacy-warning {\n  display: flex; flex-direction: column; gap: 4px; margin-top: 13px; padding: 10px 12px;\n  border-radius: 9px; border: 1px solid #f1dfba; background: #fffbf1;\n}\n.privacy-warning strong { color: #8d672d; font-family: var(--font-cn); font-size: 9px; }\n.privacy-warning span { color: #958261; font-family: var(--font-cn); font-size: 9px; line-height: 1.6; }\n.ai-modal-footer { align-items: flex-end; }\n.ai-modal-footer .import-status { max-width: 390px; line-height: 1.55; }\n.modal-footer { display: flex; align-items: center; justify-content: space-between; gap: 15px; padding-top: 16px; border-top: 1px solid #eef1f5; margin-top: 15px; }\n.import-status { color: #9aa5b4; font-family: var(--font-cn); font-size: 10px; }\n.ocr-textarea {\n  width: 100%; min-height: 245px; resize: vertical; border: 1px solid #dfe7f0; border-radius: 9px;\n  padding: 12px; font-family: var(--font-cn); color: #4f5f74; font-size: 11px; line-height: 1.7; background: #fbfcfe;\n}\n.ocr-progress { height: 3px; background: #edf2f8; border-radius: 3px; overflow: hidden; margin: 0 0 14px; }\n.ocr-progress span { display: block; height: 100%; width: 35%; background: #4b83e5; border-radius: 3px; transition: width .3s ease; }\n.toast {\n  position: fixed; z-index: 200; left: 50%; bottom: 27px; transform: translate(-50%, 15px);\n  background: #1d2a40; color: #fff; border-radius: 8px; padding: 10px 15px;\n  font-family: var(--font-cn); font-size: 11px; box-shadow: 0 10px 25px rgba(20,32,50,.25);\n  opacity: 0; pointer-events: none; transition: .2s ease; max-width: 80vw; text-align: center;\n}\n.toast.show { opacity: 1; transform: translate(-50%, 0); }\n.print-root { display: none; }\n\n@media (max-width: 980px) {\n  .topbar { padding: 0 16px; }\n  .save-state { display: none; }\n  .sidebar { width: 292px; flex-basis: 292px; padding-left: 16px; padding-right: 16px; }\n  .paper-stage { padding-left: 18px; padding-right: 18px; }\n}\n@media (max-width: 760px) {\n  .topbar { height: 64px; flex-basis: 64px; }\n  .brand-caption, .topbar .button-quiet { display: none; }\n  .brand-name { font-size: 11px; }\n  .brand-mark { width: 32px; height: 32px; border-radius: 9px; }\n  .button { min-height: 34px; padding: 0 11px; font-size: 10px; }\n  .workspace { display: block; }\n  .sidebar { width: 100%; height: auto; max-height: none; border-right: 0; border-bottom: 1px solid #dfe5ee; padding: 17px 15px; }\n  .sidebar-heading, .sidebar-footer { display: none; }\n  .step-nav { margin: 0 0 16px; }\n  .editor-list { max-height: 380px; overflow-y: auto; }\n  .editor-group.is-mobile-hidden { display: none; }\n  .editor-group.is-open .field input, .editor-group.is-open .field textarea {\n    color: #3c4a60;\n    -webkit-text-fill-color: #3c4a60;\n    caret-color: #1f67ed;\n  }\n  .preview-area { min-height: 560px; }\n  .preview-toolbar { padding: 0 14px; }\n  .a4-label { display: none; }\n  .paper-stage { padding: 17px 10px 30px; justify-content: flex-start; }\n  .paper-scaler { transform-origin: top left; }\n  .stage-footer { padding: 0 14px; }\n  .modal { padding: 24px 19px 18px; border-radius: 14px; }\n  .modal h2 { font-size: 18px; }\n  .import-result-actions { align-items: stretch; flex-direction: column; }\n  .import-result-buttons { display: grid; grid-template-columns: 1fr 1fr; }\n  .ai-form { grid-template-columns: 1fr; }\n  .ai-form .field.is-wide { grid-column: auto; }\n  .ai-modal-footer { align-items: stretch; flex-direction: column; }\n}\n\n\n";
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

  // Fragment 10: resume preview rendering.

  function iconPhotoSvg() {
    return `<div class="photo-placeholder">照</div>`;
  }

  function contactItem(label, value) {
    if (!value) return "";
    return `<div class="contact-item" data-label="${escapeHtml(label)}"><span class="label">${escapeHtml(label)}：</span><span class="value">${escapeHtml(value)}</span></div>`;
  }

  function headerHtml() {
    const b = state.basics;
    const photo = state.showPhoto
      ? `<div class="photo-frame">${state.photo ? `<img src="${state.photo}" alt="${escapeHtml(b.name || "头像")}">` : iconPhotoSvg()}</div>`
      : "";
    return `<header class="resume-header">
      ${photo}
      <div class="header-identity">
        <h2 class="resume-name">${escapeHtml(b.name || "姓名")}</h2>
        <p class="resume-role">${escapeHtml(b.role || "职位 / 方向")}</p>
        <div class="contact-grid">
          ${contactItem("地址", b.location)}
          ${contactItem("电话", b.phone)}
          ${contactItem("邮箱", b.email)}
          ${contactItem("当前状态", b.status)}
        </div>
        <div class="header-extra">
          ${b.gender ? `<span><b>性别：</b>${escapeHtml(b.gender)}</span>` : ""}
          ${b.hometown ? `<span><b>籍贯：</b>${escapeHtml(b.hometown)}</span>` : ""}
          ${b.political ? `<span><b>政治面貌：</b>${escapeHtml(b.political)}</span>` : ""}
        </div>
      </div>
    </header>`;
  }

  function sectionHeading(title, code) {
    return `<div class="section-heading"><span class="section-tab">${escapeHtml(title)}</span><span class="section-heading-line">${escapeHtml(code)}</span></div>`;
  }

  function bulletsHtml(items = []) {
    if (!items.length) return "";
    return `<ul class="bullet-list">${items.filter(Boolean).map(item => `<li>${safeRich(item)}</li>`).join("")}</ul>`;
  }

  function entryHtml(item, kind) {
    if (!item.org && !item.title && !item.bullets?.length) return "";
    const right = item.right || (kind === "education" ? "" : "");
    return `<div class="entry">
      <div class="entry-head">
        <div class="entry-org">${escapeHtml(item.org || "机构名称")}</div>
        ${item.date ? `<div class="entry-date">${escapeHtml(item.date)}</div>` : ""}
      </div>
      ${(item.title || right) ? `<div class="entry-subhead"><span>${escapeHtml(item.title || "")}</span>${right ? `<span class="right">${escapeHtml(right)}</span>` : ""}</div>` : ""}
      ${bulletsHtml(item.bullets || [])}
    </div>`;
  }

  function summaryHtml() {
    if (!state.summary.lead && !state.summary.bullets.some(Boolean)) return "";
    return `<section class="resume-section section-summary">
      ${sectionHeading("个人总结", "PROFILE")}
      ${state.summary.lead ? `<p class="summary-lead">${safeRich(state.summary.lead)}</p>` : ""}
      ${bulletsHtml(state.summary.bullets)}
    </section>`;
  }

  function listSectionHtml(id, title, code, items, kind) {
    if (!items || !items.length) return "";
    return `<section class="resume-section section-${id}">
      ${sectionHeading(title, code)}
      ${items.map(item => entryHtml(item, kind)).join("")}
    </section>`;
  }

  function skillsHtml() {
    if (!state.skills.length) return "";
    return `<section class="resume-section section-skills">
      ${sectionHeading("技能", "EXPERTISE")}
      <div class="skill-grid">
        ${state.skills.map(skill => `<div class="skill-card">
          <div class="skill-name">${escapeHtml(skill.name || "技能名称")}</div>
          <div class="skill-dots">${Array.from({ length: 5 }, (_, i) => `<span class="skill-dot ${i < (+skill.level || 0) ? "on" : ""}"></span>`).join("")}</div>
          <div class="skill-desc">${escapeHtml(skill.desc || "")}</div>
        </div>`).join("")}
      </div>
    </section>`;
  }

  function customHtml() {
    if (!state.custom.length) return "";
    return `<section class="resume-section section-custom">
      ${sectionHeading("其他经历", "ADDITIONAL")}
      ${state.custom.map(item => `<div class="entry">
        <div class="entry-head"><div class="entry-org">${escapeHtml(item.title || "经历标题")}</div>${item.date ? `<div class="entry-date">${escapeHtml(item.date)}</div>` : ""}</div>
        ${item.content ? `<p class="entry-title">${safeRich(item.content)}</p>` : ""}
      </div>`).join("")}
    </section>`;
  }

  function bodyColumns() {
    const experience = listSectionHtml("experience", "工作经历", "EXPERIENCE", state.experience, "experience");
    const projects = listSectionHtml("projects", "项目经历", "SELECTED WORK", state.projects, "projects");
    const education = listSectionHtml("education", "教育经历", "EDUCATION", state.education, "education");
    const skills = skillsHtml();
    const custom = customHtml();
    if (state.template === "sidebar") {
      return `<div class="resume-main">
        <div class="main-column">${summaryHtml()}${experience}${projects}${custom}</div>
        <aside class="side-column">${education}${skills}</aside>
      </div>`;
    }
    return `<div class="resume-main">${summaryHtml()}${experience}${projects}${education}${skills}${custom}</div>`;
  }

  function renderPreview() {
    const page = $("#resumePage");
    const content = $("#resumeContent");
    page.dataset.template = state.template;
    page.dataset.workCard = state.workCardStyle;
    page.className = `resume-page header-${state.headerShape} margin-${state.margin}`;
    page.style.setProperty("--accent", state.accent);
    page.style.setProperty("--accent-soft", mixColor(state.accent, "#ffffff", .9));
    page.style.setProperty("--header-height", `${state.headerHeight}px`);
    page.style.setProperty("--header-radius", `${state.radius}px`);
    page.style.setProperty("--card-radius", `${state.cardRadius}px`);
    content.style.setProperty("--accent", state.accent);
    content.style.setProperty("--accent-soft", mixColor(state.accent, "#ffffff", .9));
    const scale = state.density / 84;
    const densityScale = state.density / 96;
    const sectionGap = Math.round(state.sectionGap * Math.max(.82, Math.min(1.08, densityScale)));
    const lineHeight = Math.min(1.88, Math.max(1.28, state.lineHeight + (densityScale - 1) * .12));
    content.style.setProperty("--resume-scale", scale);
    content.style.setProperty("--section-gap", `${sectionGap}px`);
    content.style.setProperty("--line-height", lineHeight.toFixed(2));
    page.style.fontSize = `${scale}px`;
    page.style.padding = "0";
    page.style.setProperty("--page-pad", state.margin);
    content.innerHTML = headerHtml() + bodyColumns();
    applyDensity();
    const epoch = ++renderEpoch;
    requestAnimationFrame(() => {
      if (epoch !== renderEpoch) return;
      updateZoom();
      updateOverflowState();
      updateStyleControls();
    });
  }

  function applyDensity() {
    const page = $("#resumePage");
    const scale = state.density / 90;
    page.style.setProperty("--density", scale);
    const main = $(".resume-main", page);
    if (!main) return;
    main.style.zoom = "";
    const padY = state.margin === "compact" ? 13 : state.margin === "airy" ? 26 : 25;
    const padX = state.margin === "compact" ? 25 : state.margin === "airy" ? 35 : 29;
    main.style.padding = `${Math.round(padY * scale)}px ${Math.round(padX * scale)}px ${Math.round((padY + 2) * scale)}px`;
  }

  function hexToRgb(hex) {
    const h = hex.replace("#", "");
    const n = parseInt(h.length === 3 ? h.split("").map(c => c + c).join("") : h, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }
  function mixColor(a, b, ratio) {
    const ca = hexToRgb(a), cb = hexToRgb(b);
    const to = v => Math.round(v).toString(16).padStart(2, "0");
    return `#${to(ca.r * (1 - ratio) + cb.r * ratio)}${to(ca.g * (1 - ratio) + cb.g * ratio)}${to(ca.b * (1 - ratio) + cb.b * ratio)}`;
  }

  // Fragment 15: lightweight undo/redo history for the single state object.
  const history = {
    past: [],
    future: [],
    current: "",
    timer: 0,
    applying: false,
    max: 40
  };

  function snapshotState() {
    return JSON.stringify(state);
  }

  function resetHistory() {
    clearTimeout(history.timer);
    history.past = [];
    history.future = [];
    history.current = snapshotState();
    history.applying = false;
    updateHistoryControls();
  }

  function recordHistory() {
    if (history.applying) return;
    clearTimeout(history.timer);
    history.timer = setTimeout(recordHistoryNow, 180);
  }

  function recordHistoryNow() {
    clearTimeout(history.timer);
    history.timer = 0;
    if (history.applying) return;
    const snapshot = snapshotState();
    if (!history.current) {
      history.current = snapshot;
      updateHistoryControls();
      return;
    }
    if (snapshot === history.current) return;
    history.past.push(history.current);
    if (history.past.length > history.max) history.past.shift();
    history.current = snapshot;
    history.future = [];
    updateHistoryControls();
  }

  function flushHistory() {
    if (history.timer) recordHistoryNow();
  }

  function restoreHistorySnapshot(snapshot) {
    history.applying = true;
    clearTimeout(renderTimer);
    state = normalizeData(JSON.parse(snapshot));
    renderEditor();
    renderPreview();
    updateStyleControls();
    saveState();
    history.applying = false;
    updateHistoryControls();
  }

  function undo() {
    flushHistory();
    if (!history.past.length) return toast("没有可撤销的操作");
    const current = snapshotState();
    const previous = history.past.pop();
    history.future.push(current);
    history.current = previous;
    restoreHistorySnapshot(previous);
    toast("已撤销");
  }

  function redo() {
    flushHistory();
    if (!history.future.length) return toast("没有可重做的操作");
    const current = snapshotState();
    const next = history.future.pop();
    history.past.push(current);
    history.current = next;
    restoreHistorySnapshot(next);
    toast("已重做");
  }

  function updateHistoryControls() {
    const undoButton = $("#undoButton");
    const redoButton = $("#redoButton");
    if (undoButton) undoButton.disabled = !history.past.length;
    if (redoButton) redoButton.disabled = !history.future.length;
  }

  // Fragment 20: left-hand editor UI.

  function renderEditor() {
    const root = $("#editorList");
    root.innerHTML = SECTION_META.map(meta => {
      const open = ui.openGroups.has(meta.id);
      const hiddenOnMobile = window.innerWidth <= 760 && !open ? " is-mobile-hidden" : "";
      const count = groupCount(meta.id);
      return `<div class="editor-group ${open ? "is-open" : ""}${hiddenOnMobile}" data-group="${meta.id}">
        <button class="group-head ${open ? "is-current" : ""}" type="button" data-toggle-group="${meta.id}">
          <span class="group-icon">${meta.icon}</span><span>${meta.label}</span><span class="group-count">${count}</span><span class="group-chevron">⌄</span>
        </button>
        <div class="group-body">${groupEditorHtml(meta.id)}</div>
      </div>`;
    }).join("");
    bindEditorInputs(root);
    $("#collapseAll").textContent = ui.openGroups.size ? "全部收起" : "全部展开";
  }

  function groupCount(id) {
    if (id === "basics") return 9;
    if (id === "summary") return state.summary.bullets.filter(Boolean).length + 1;
    if (id === "skills") return state.skills.length;
    if (id === "custom") return state.custom.length;
    return state[id]?.length || 0;
  }

  function fieldHtml(label, value, path, opts = {}) {
    const tag = opts.multiline ? "textarea" : "input";
    const type = opts.type || "text";
    const wide = opts.wide ? " is-wide" : "";
    const attrs = tag === "input" ? `type="${type}"` : "";
    return `<label class="field${wide}"><span class="field-label">${label}</span><${tag} ${attrs} data-path="${path}" ${opts.placeholder ? `placeholder="${escapeHtml(opts.placeholder)}"` : ""}>${tag === "textarea" ? escapeHtml(value || "") : ""}</${tag}></label>`
      .replace(`<input type="text" data-path="${path}" ${opts.placeholder ? `placeholder="${escapeHtml(opts.placeholder)}"` : ""}></input>`, `<input type="text" data-path="${path}" value="${escapeHtml(value || "")}" ${opts.placeholder ? `placeholder="${escapeHtml(opts.placeholder)}"` : ""}>`);
  }

  function inputField(label, value, path, opts = {}) {
    return `<label class="field ${opts.wide ? "is-wide" : ""}"><span class="field-label">${label}</span><input type="${opts.type || "text"}" data-path="${path}" value="${escapeHtml(value || "")}" placeholder="${escapeHtml(opts.placeholder || "")}"></label>`;
  }

  function textareaField(label, value, path) {
    return `<label class="field is-wide"><span class="field-label">${label}</span><textarea data-path="${path}">${escapeHtml(value || "")}</textarea></label>`;
  }

  function groupEditorHtml(id) {
    if (id === "basics") {
      const b = state.basics;
      return `<div class="field-grid">
        ${inputField("姓名", b.name, "basics.name")}
        ${inputField("职位方向", b.role, "basics.role")}
        ${inputField("所在城市", b.location, "basics.location")}
        ${inputField("联系电话", b.phone, "basics.phone")}
        ${inputField("邮箱", b.email, "basics.email", { wide: true })}
        ${inputField("求职状态", b.status, "basics.status")}
        ${inputField("性别", b.gender, "basics.gender")}
        ${inputField("籍贯", b.hometown, "basics.hometown")}
        ${inputField("政治面貌", b.political, "basics.political")}
      </div>
      <div class="photo-field-row">
        ${state.photo ? `<img class="photo-thumb" src="${state.photo}" alt="当前头像">` : `<div class="photo-thumb"></div>`}
        <button type="button" class="mini-action" id="changePhoto">更换头像</button>
        ${state.photo ? `<button type="button" class="mini-action" id="removePhoto">移除</button>` : ""}
      </div>`;
    }
    if (id === "summary") {
      const bulletText = state.summary.bullets.map(richToMarkdown).join("\n");
      return `<div class="field-grid">
        ${textareaField("概述", String(state.summary.lead).replace(/<[^>]+>/g, ""), "summary.lead")}
        ${textareaField("亮点（每行一条，**文字**可加粗）", bulletText, "summary.bullets")}
      </div>`;
    }
    if (id === "skills") {
      return state.skills.map((s, i) => `<div class="item-card" data-item="skills" data-index="${i}">
        <div class="item-card-head"><span>技能 ${i + 1}</span>${itemActions("skills", i)}</div>
        <div class="field-grid">
          ${inputField("名称", s.name, `skills.${i}.name`)}
          ${inputField("熟练度 0-5", s.level, `skills.${i}.level`, { type: "number" })}
          ${inputField("说明", s.desc, `skills.${i}.desc`, { wide: true })}
        </div>
      </div>`).join("") + `<button type="button" class="add-item" data-add="skills">＋ 添加技能</button>`;
    }
    if (id === "custom") {
      return state.custom.map((item, i) => `<div class="item-card" data-item="custom" data-index="${i}">
        <div class="item-card-head"><span>自定义经历 ${i + 1}</span>${itemActions("custom", i)}</div>
        <div class="field-grid">
          ${inputField("标题", item.title, `custom.${i}.title`)}
          ${inputField("时间", item.date, `custom.${i}.date`)}
          ${textareaField("内容", item.content, `custom.${i}.content`)}
        </div>
      </div>`).join("") + `<button type="button" class="add-item" data-add="custom">＋ 添加自定义经历</button>`;
    }
    const items = state[id] || [];
    return items.map((item, i) => `<div class="item-card" data-item="${id}" data-index="${i}">
      <div class="item-card-head"><span>${id === "education" ? "教育" : id === "projects" ? "项目" : "工作"} ${i + 1}</span>${itemActions(id, i)}</div>
      <div class="field-grid">
        ${inputField(id === "education" ? "学校" : id === "projects" ? "项目名称" : "公司名称", item.org, `${id}.${i}.org`)}
        ${inputField("时间", item.date, `${id}.${i}.date`)}
        ${inputField(id === "education" ? "专业" : "职位 / 角色", item.title, `${id}.${i}.title`)}
        ${id === "education" ? inputField("学历", item.right || "", `${id}.${i}.right`) : ""}
        ${textareaField("描述（每行一条，**文字**可加粗）", (item.bullets || []).map(richToMarkdown).join("\n"), `${id}.${i}.bullets`)}
      </div>
    </div>`).join("") + `<button type="button" class="add-item" data-add="${id}">＋ 添加${id === "education" ? "教育经历" : id === "projects" ? "项目经历" : "工作经历"}</button>`;
  }

  function itemActions(type, index) {
    return `<span class="item-actions">
      <button type="button" data-move="${type}" data-index="${index}" data-dir="-1" title="上移">↑</button>
      <button type="button" data-move="${type}" data-index="${index}" data-dir="1" title="下移">↓</button>
      <button type="button" data-delete="${type}" data-index="${index}" title="删除">×</button>
    </span>`;
  }

  function getPath(obj, path) {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  }
  function setPath(obj, path, value) {
    const parts = path.split(".");
    const last = parts.pop();
    const target = parts.reduce((acc, key) => {
      if (!acc[key] || typeof acc[key] !== "object") acc[key] = {};
      return acc[key];
    }, obj);
    target[last] = value;
  }

  function bindEditorInputs(root) {
    $$("[data-path]", root).forEach(input => {
      input.addEventListener("input", () => {
        const path = input.dataset.path;
        let value = input.value;
        if (/\.(level)$/.test(path)) value = Math.min(5, Math.max(0, +value || 0));
        if (/summary\.bullets$/.test(path)) value = value.split("\n").map(markdownToRich);
        if (/\.bullets$/.test(path)) value = value.split("\n").filter((v, i, arr) => v.length || i < arr.length - 1).map(markdownToRich);
        setPath(state, path, value);
        scheduleRender();
        updateCounts();
      });
    });
  }

  function richToMarkdown(text) {
    return String(text)
      .replace(/<strong>/gi, "**").replace(/<\/strong>/gi, "**")
      .replace(/<b>/gi, "**").replace(/<\/b>/gi, "**");
  }

  function markdownToRich(text) {
    return String(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  }

  function updateCounts() {
    $$(".editor-group").forEach(group => {
      const id = group.dataset.group;
      const count = $(".group-count", group);
      if (count) count.textContent = groupCount(id);
    });
  }

  function renderPresets() {
    $("#presetGrid").innerHTML = PRESETS.map(p => `<button type="button" class="preset-card ${state.template === p.id ? "is-active" : ""}" data-preset="${p.id}" style="--preset-accent:${p.accent}"><div class="preset-thumb"></div><span>${p.name}</span></button>`).join("");
    $("#swatchList").innerHTML = ACCENT_SWATCHES.map(c => `<button type="button" class="swatch ${state.accent.toLowerCase() === c.toLowerCase() ? "is-active" : ""}" data-swatch="${c}" style="background:${c}" aria-label="${c}"></button>`).join("");
  }

  function updateStyleControls() {
    $("#accentColor").value = state.accent;
    $("#densityRange").value = state.density;
    $("#densityValue").textContent = state.density < 90 ? "紧凑" : state.density > 102 ? "舒展" : "舒适";
    $("#headerShape").value = state.headerShape;
    $("#showPhoto").checked = state.showPhoto;
    $("#pageMargin").value = state.margin;
    $("#headerHeightRange").value = state.headerHeight;
    $("#headerHeightValue").textContent = `${state.headerHeight}px`;
    $("#radiusRange").value = state.radius;
    $("#radiusValue").textContent = `${state.radius}px`;
    $("#cardRadiusRange").value = state.cardRadius;
    $("#cardRadiusValue").textContent = `${state.cardRadius}px`;
    $("#sectionGapRange").value = state.sectionGap;
    $("#sectionGapValue").textContent = `${state.sectionGap}px`;
    $("#lineHeightRange").value = state.lineHeight;
    $("#lineHeightValue").textContent = Number(state.lineHeight).toFixed(2);
    $("#workCardStyle").value = state.workCardStyle;
    renderPresets();
  }

  // Fragment 30: panels, zoom, overflow detection and auto-fit.

  function switchPanel(panel) {
    ui.panel = panel;
    $$(".step").forEach(btn => btn.classList.toggle("is-active", btn.dataset.step === panel));
    $$("[data-panel]").forEach(el => { el.hidden = el.dataset.panel !== panel; });
    if (panel === "fit") setTimeout(updateOverflowState, 30);
  }

  function setZoom(zoom) {
    ui.zoom = Math.min(1.35, Math.max(.42, zoom));
    updateZoom();
  }

  function updateZoom() {
    const stage = $("#paperStage");
    if (stage.classList.contains("is-fullscreen")) {
      const availH = stage.clientHeight - 70;
      const availW = stage.clientWidth - 50;
      const z = Math.min(availH / 1123, availW / 794, 1.25);
      $("#paperScaler").style.transform = `scale(${z})`;
      $("#paperScaler").style.height = `${1123 * z}px`;
      $("#zoomLabel").textContent = `${Math.round(z * 100)}%`;
      return;
    }
    $("#paperScaler").style.transform = `scale(${ui.zoom})`;
    $("#paperScaler").style.height = `${1123 * ui.zoom}px`;
    $("#zoomLabel").textContent = `${Math.round(ui.zoom * 100)}%`;
  }

  function fitWidth() {
    const stage = $("#paperStage");
    const available = Math.max(280, stage.clientWidth - (window.innerWidth < 760 ? 20 : 70));
    setZoom(Math.min(.98, available / 794));
  }

  function getContentHeight() {
    const content = $("#resumeContent");
    if (!content) return 1123;
    const children = [...content.children];
    if (!children.length) return 0;
    const top = $("#resumePage").getBoundingClientRect().top;
    const renderedWidth = $("#paperScaler").getBoundingClientRect().width;
    const scale = renderedWidth ? renderedWidth / 794 : (ui.zoom || 1);
    return Math.max(...children.map(el => el.getBoundingClientRect().bottom - top)) / scale;
  }

  function updateOverflowState() {
    const height = getContentHeight();
    const ratio = height / 1123;
    const isOver = ratio > 1.003;
    $("#fitStatus").textContent = isOver ? "需要压缩" : "适合一页";
    $("#fitStatus").classList.toggle("warn", isOver);
    $("#pageUsage").textContent = `${Math.min(999, Math.round(ratio * 100))}%`;
    $("#overflowNotice").textContent = isOver ? `内容约超出 ${Math.max(1, Math.round((ratio - 1) * 1123))}px` : "版面状态良好";
    $("#overflowNotice").style.color = isOver ? "#a36a1d" : "";
    return { height, ratio, isOver };
  }

  function autoFit() {
    ui.fitting = true;
    const initialDensity = state.density;
    let density = Math.min(100, Math.max(80, state.density));
    const originalMargin = state.margin;
    if (state.margin === "airy") state.margin = "standard";
    applyDensity();
    let info = updateOverflowState();
    while (info.isOver && density > 80) {
      density = Math.max(80, density - 1);
      state.density = density;
      renderPreview();
      info = updateOverflowState();
    }
    if (info.isOver) {
      state.margin = "compact";
      applyDensity();
      info = updateOverflowState();
    }
    if (!info.isOver) {
      toast(`已适配一页 · 内容密度 ${state.density < 90 ? "紧凑" : "舒适"}`);
    } else {
      state.density = initialDensity;
      state.margin = originalMargin;
      renderPreview();
      toast("内容较多，已保持最小可读字号；建议精简 1-2 条描述");
    }
    updateStyleControls();
    saveState();
    ui.fitting = false;
  }

  function addItem(type) {
    if (type === "skills") {
      state.skills.push({ name: "新技能", level: 3, desc: "技能说明" });
    } else if (type === "custom") {
      state.custom.push({ id: uid("custom"), title: "自定义经历", date: "", content: "在这里填写经历内容。" });
    } else if (type === "education") {
      state.education.push({ id: uid("edu"), org: "学校名称", title: "专业名称", right: "本科", date: "2020-09 - 2024-06", bullets: ["在这里填写教育经历亮点"] });
    } else if (type === "projects") {
      state.projects.push({ id: uid("proj"), org: "项目名称", title: "角色", date: "2024-01 - 2024-12", bullets: ["在这里填写项目成果"] });
    } else {
      state.experience.push({ id: uid("exp"), org: "公司名称", title: "职位", date: "2023-01 - 至今", bullets: ["在这里填写工作成果"] });
    }
    ui.openGroups.add(type);
    renderEditor();
    renderPreview();
    saveState();
  }

  function moveItem(type, index, dir) {
    const arr = state[type];
    if (!arr) return;
    const target = index + Number(dir);
    if (target < 0 || target >= arr.length) return;
    [arr[index], arr[target]] = [arr[target], arr[index]];
    renderEditor();
    renderPreview();
    saveState();
  }

  function deleteItem(type, index) {
    const arr = state[type];
    if (!arr || arr.length <= 1) return toast("至少保留一条，避免版式结构缺失");
    if (!confirm("确认删除这一条内容？")) return;
    arr.splice(index, 1);
    renderEditor();
    renderPreview();
    saveState();
  }

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
    importContext = { image: null, palette: null, features: null, text: "", file: null };
    $("#importModal").hidden = false;
    $("#importResultActions").hidden = true;
    $("#importStatus").textContent = "等待选择图片";
    $("#chooseImageButton").textContent = "选择图片";
  }

  async function beginImageImport(file) {
    if (!file || !file.type.startsWith("image/")) return toast("请选择 PNG、JPG 或 WEBP 图片");
    $("#importStatus").textContent = "正在分析版式与配色…";
    $("#importResultActions").hidden = true;
    $("#chooseImageButton").textContent = "重新选择";
    try {
      const result = await analyzeImage(file);
      importContext = { image: result.dataUrl, palette: result.palette, features: result.features, text: "", file };
      const detected = result.features;
      const shapeLabel = detected.shape === "rounded" ? "圆角头部" : detected.shape === "arch" ? "拱形头部" : "直角头部";
      $("#importStatus").textContent = `版式分析完成 · ${LAYOUT_TEMPLATE_NAMES[detected.template]} · ${shapeLabel} · ${Math.round(detected.confidence * 100)}%`;
      $("#importResultActions").hidden = false;
    } catch (error) {
      console.error(error);
      $("#importStatus").textContent = "图片分析失败，请换一张图片";
      $("#chooseImageButton").textContent = "选择图片";
      toast("图片读取失败");
    }
  }

  function useLocalLayout() {
    if (!importContext.features) return toast("请先选择简历图片");
    $("#importModal").hidden = true;
    continueImageImport();
  }

  async function continueImageImport() {
    if ($("#mergeToggle").checked) return startImportOcr();
    applyImportedStyle(false);
  }

  async function startImportOcr() {
    if (!importContext.file) return toast("请先选择简历图片");
    $("#ocrModal").hidden = false;
    $("#ocrText").value = "正在识别图片文字，请稍候…";
    $("#ocrProgress span").style.width = "12%";
    $("#ocrStatus").textContent = "正在加载 OCR 引擎";
    try {
      const preparedImage = await makeOcrFriendlyImage(importContext.file);
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
    if (importContext.features.margin) state.margin = importContext.features.margin;
    if (typeof importContext.features.showPhoto === "boolean") state.showPhoto = importContext.features.showPhoto;
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

// Fragment 60: reusable template DSL import/export.
  const TEMPLATE_VERSION = 1;
  const TEMPLATE_MARGINS = ["compact", "standard", "airy"];
  const HEADER_SHAPES = ["rounded", "straight", "arch"];
  const WORK_CARD_STYLES = ["dashed", "soft", "none"];
  const TEMPLATE_IDS = PRESETS.map(preset => preset.id);

  function normalizeDensity(value) {
    if (value === undefined || value === null || value === "") return 96;
    const number = Number(value);
    if (!Number.isFinite(number)) return 96;
    return Math.min(112, Math.max(80, Math.round(number)));
  }

  function boundedNumber(value, min, max, fallback, digits = 0) {
    const number = Number(value);
    if (!Number.isFinite(number)) return fallback;
    const factor = 10 ** digits;
    return Math.min(max, Math.max(min, Math.round(number * factor) / factor));
  }

  function normalizeTemplate(input) {
    const data = input && typeof input === "object" ? input : {};
    const theme = data.theme && typeof data.theme === "object" ? data.theme : {};
    const page = data.page && typeof data.page === "object" ? data.page : {};
    const layout = data.layout && typeof data.layout === "object" ? data.layout : {};

    const template = TEMPLATE_IDS.includes(layout.template)
      ? layout.template
      : TEMPLATE_IDS.includes(data.template) ? data.template : "classic";
    const headerShape = HEADER_SHAPES.includes(theme.headerShape)
      ? theme.headerShape
      : HEADER_SHAPES.includes(data.headerShape) ? data.headerShape : "rounded";
    const margin = TEMPLATE_MARGINS.includes(page.margin)
      ? page.margin
      : TEMPLATE_MARGINS.includes(data.margin) ? data.margin : "standard";
    const accentValue = typeof (theme.accent || data.accent) === "string" ? (theme.accent || data.accent) : "";
    const accent = /^#[0-9a-f]{6}$/i.test(accentValue) ? accentValue.toLowerCase() : "#2563eb";
    const showPhoto = (theme.showPhoto ?? data.showPhoto) !== false;
    const headerHeight = boundedNumber(theme.headerHeight ?? data.headerHeight, 145, 235, 177);
    const radius = boundedNumber(theme.radius ?? data.radius, 0, 58, 34);
    const cardRadius = boundedNumber(theme.cardRadius ?? data.cardRadius, 0, 32, 15);
    const sectionGap = boundedNumber(theme.sectionGap ?? data.sectionGap, 14, 46, 34);
    const lineHeight = boundedNumber(theme.lineHeight ?? data.lineHeight, 1.32, 1.82, 1.6, 2);
    const workCardStyle = WORK_CARD_STYLES.includes(theme.workCardStyle)
      ? theme.workCardStyle
      : WORK_CARD_STYLES.includes(data.workCardStyle) ? data.workCardStyle : "dashed";

    return {
      version: TEMPLATE_VERSION,
      name: String(data.name || "导入的模板").slice(0, 60),
      page: { size: "A4", margin },
      theme: {
        accent,
        headerShape,
        density: normalizeDensity(theme.density ?? data.density),
        showPhoto,
        headerHeight,
        radius,
        cardRadius,
        sectionGap,
        lineHeight,
        workCardStyle
      },
      layout: { template }
    };
  }

  function templateFromState(source = state) {
    const templateName = LAYOUT_TEMPLATE_NAMES[source.template] || "自定义版式";
    const shapeName = source.headerShape === "rounded"
      ? "圆角头部"
      : source.headerShape === "arch" ? "拱形头部" : "直角头部";
    return normalizeTemplate({
      version: TEMPLATE_VERSION,
      name: `${templateName} · ${shapeName}`,
      page: { size: "A4", margin: source.margin },
      theme: {
        accent: source.accent,
        headerShape: source.headerShape,
        density: source.density,
        showPhoto: source.showPhoto,
        headerHeight: source.headerHeight,
        radius: source.radius,
        cardRadius: source.cardRadius,
        sectionGap: source.sectionGap,
        lineHeight: source.lineHeight,
        workCardStyle: source.workCardStyle
      },
      layout: { template: source.template }
    });
  }

  function applyTemplate(input) {
    const template = normalizeTemplate(input);
    state.template = template.layout.template;
    state.headerShape = template.theme.headerShape;
    state.density = template.theme.density;
    state.margin = template.page.margin;
    state.accent = template.theme.accent;
    state.showPhoto = template.theme.showPhoto;
    state.headerHeight = template.theme.headerHeight;
    state.radius = template.theme.radius;
    state.cardRadius = template.theme.cardRadius;
    state.sectionGap = template.theme.sectionGap;
    state.lineHeight = template.theme.lineHeight;
    state.workCardStyle = template.theme.workCardStyle;
    renderPreview();
    updateStyleControls();
    saveState();
    return template;
  }

  function exportTemplate() {
    const template = templateFromState();
    const safeName = template.name.replace(/[\\/:*?"<>|]/g, "-");
    downloadBlob(
      new Blob([JSON.stringify(template, null, 2)], { type: "application/json" }),
      `${safeName}.resume-template.json`
    );
    toast("已导出模板");
  }

  async function importTemplateFile(file) {
    try {
      const parsed = JSON.parse(await readFileAsText(file));
      const template = applyTemplate(parsed);
      toast(`已应用模板：${template.name}`);
    } catch {
      toast("模板文件格式不正确");
    }
  }

// Fragment 70: optional BYOK vision model adapter for layout analysis.
  const AI_SETTINGS_KEY = "resume-studio-ai-v1";
  const AI_PROVIDERS = {
    openai: {
      label: "OpenAI",
      adapter: "openai",
      defaultBase: "https://api.openai.com/v1",
      defaultModel: "gpt-4.1-mini"
    },
    compatible: {
      label: "OpenAI 兼容（Qwen / GLM / 自定义）",
      adapter: "openai",
      defaultBase: "",
      defaultModel: ""
    },
    anthropic: {
      label: "Anthropic Claude",
      adapter: "anthropic",
      defaultBase: "https://api.anthropic.com/v1",
      defaultModel: "claude-sonnet-4-5"
    }
  };

  let aiSessionSettings = null;

  function defaultAiSettings() {
    return { provider: "openai", base: "", model: "", apiKey: "", remember: false };
  }

  function loadAiSettings() {
    if (aiSessionSettings) return { ...aiSessionSettings };
    try {
      const raw = localStorage.getItem(AI_SETTINGS_KEY);
      if (raw) return { ...defaultAiSettings(), ...JSON.parse(raw) };
    } catch {
      // Storage can be unavailable in private mode; fall back to defaults.
    }
    return defaultAiSettings();
  }

  function persistAiSettings(settings) {
    aiSessionSettings = { ...settings };
    try {
      if (settings.remember && settings.apiKey) localStorage.setItem(AI_SETTINGS_KEY, JSON.stringify(settings));
      else localStorage.removeItem(AI_SETTINGS_KEY);
    } catch {
      // Ignore quota/private-mode errors; the key remains in memory for this session.
    }
  }

  function resolvedAiSettings(settings = loadAiSettings()) {
    const provider = AI_PROVIDERS[settings.provider] ? settings.provider : "openai";
    const meta = AI_PROVIDERS[provider];
    return {
      ...settings,
      provider,
      base: String(settings.base || meta.defaultBase || "").replace(/\/+$/, ""),
      model: String(settings.model || meta.defaultModel || "").trim(),
      apiKey: String(settings.apiKey || "").trim()
    };
  }

  function buildVisionPrompt() {
    return [
      "你是一名资深简历版式分析师。请只分析这张简历截图的视觉版式，不要复述或提取任何个人隐私内容。",
      "",
      "请从以下固定选项中选择最接近的一项：",
      "- layout.template: classic（顶部色块 + 单栏）、sidebar（顶部头部 + 侧栏）、editorial（浅色头部 + 编辑感留白）、minimal（白底 + 细线标题）",
      "- theme.headerShape: rounded（头部卡片右下角圆角）、straight（直角）、arch（拱形）",
      "- theme.density: 80-112 的整数，版面越紧凑数值越小",
      "- theme.headerHeight: 头部视觉高度，145-235 的整数",
      "- theme.radius: 头部大圆角，0-58 的整数",
      "- theme.cardRadius: 简历卡片圆角，0-32 的整数",
      "- theme.sectionGap: 栏目标题之间的间距，14-46 的整数",
      "- theme.lineHeight: 正文行高，1.32-1.82",
      "- theme.workCardStyle: dashed（虚线卡片）、soft（柔光卡片）、none（无卡片）",
      "- page.margin: compact / standard / airy",
      "- theme.showPhoto: 是否有证件照",
      "- theme.accent: 主色的十六进制值",
      "",
      "只输出严格 JSON，不要 Markdown，不要解释：",
      '{"version":1,"name":"简短模板名","page":{"size":"A4","margin":"standard"},"theme":{"accent":"#2563eb","headerShape":"rounded","density":96,"showPhoto":true,"headerHeight":177,"radius":34,"cardRadius":15,"sectionGap":34,"lineHeight":1.6,"workCardStyle":"dashed"},"layout":{"template":"classic"}}'
    ].join("\n");
  }

  function aiRequestFor(providerId, settings, imageDataUrl) {
    const meta = AI_PROVIDERS[providerId];
    if (!meta) throw new Error("未知的 AI 服务商");
    const base = String(settings.base || "").replace(/\/+$/, "");
    if (!base) throw new Error("请填写 Base URL");
    if (!settings.model) throw new Error("请填写模型名称");
    if (!settings.apiKey) throw new Error("请填写 API Key");

    if (meta.adapter === "anthropic") {
      const match = /^data:([^;]+);base64,(.+)$/.exec(imageDataUrl);
      if (!match) throw new Error("图片格式不受支持");
      return {
        url: `${base}/messages`,
        headers: {
          "Content-Type": "application/json",
          "x-api-key": settings.apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body: {
          model: settings.model,
          max_tokens: 1200,
          temperature: 0,
          messages: [{
            role: "user",
            content: [
              { type: "image", source: { type: "base64", media_type: match[1], data: match[2] } },
              { type: "text", text: buildVisionPrompt() }
            ]
          }]
        }
      };
    }

    return {
      url: `${base}/chat/completions`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${settings.apiKey}`
      },
      body: {
        model: settings.model,
        temperature: 0,
        max_tokens: 900,
        messages: [{
          role: "user",
          content: [
            { type: "text", text: buildVisionPrompt() },
            { type: "image_url", image_url: { url: imageDataUrl, detail: "high" } }
          ]
        }]
      }
    };
  }

  function extractJsonObject(text) {
    if (!text) return null;
    const source = String(text);
    const fenced = source.match(/```(?:json)?\s*([\s\S]*?)```/i);
    const candidate = fenced ? fenced[1] : source;
    const start = candidate.indexOf("{");
    const end = candidate.lastIndexOf("}");
    if (start < 0 || end <= start) return null;
    try {
      return JSON.parse(candidate.slice(start, end + 1));
    } catch {
      return null;
    }
  }

  async function analyzeLayoutWithAi(imageDataUrl, rawSettings = loadAiSettings()) {
    const settings = resolvedAiSettings(rawSettings);
    const request = aiRequestFor(settings.provider, settings, imageDataUrl);
    const response = await fetch(request.url, {
      method: "POST",
      headers: request.headers,
      body: JSON.stringify(request.body)
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      throw new Error(`服务返回 ${response.status}${detail ? `：${detail.slice(0, 160)}` : ""}`);
    }
    const data = await response.json();
    const text = AI_PROVIDERS[settings.provider].adapter === "anthropic"
      ? (data.content || []).map(part => part.text || "").join("")
      : data.choices?.[0]?.message?.content || "";
    const parsed = extractJsonObject(text);
    if (!parsed) throw new Error("模型没有返回可解析的 JSON");
    return normalizeTemplate(parsed);
  }

  function updateAiPlaceholders() {
    const meta = AI_PROVIDERS[$("#aiProvider").value] || AI_PROVIDERS.openai;
    $("#aiBase").placeholder = meta.defaultBase || "https://your-endpoint/v1";
    $("#aiModel").placeholder = meta.defaultModel || "模型名称";
    $("#aiProviderHint").textContent = meta.adapter === "anthropic"
      ? "Claude 会通过官方 Messages API 接收图片。"
      : "OpenAI 兼容接口：Base URL 通常以 /v1 结尾，模型需支持图片输入。";
  }

  function openAiSettings() {
    const settings = loadAiSettings();
    $("#aiProvider").value = settings.provider;
    $("#aiBase").value = settings.base;
    $("#aiModel").value = settings.model;
    $("#aiKey").value = settings.apiKey;
    $("#aiRemember").checked = settings.remember;
    updateAiPlaceholders();
    $("#aiModal").hidden = false;
  }

  function saveAiSettingsFromForm() {
    const settings = {
      provider: $("#aiProvider").value,
      base: $("#aiBase").value.trim(),
      model: $("#aiModel").value.trim(),
      apiKey: $("#aiKey").value.trim(),
      remember: $("#aiRemember").checked
    };
    persistAiSettings(settings);
    $("#aiModal").hidden = true;
    toast(settings.apiKey ? "AI 设置已保存" : "AI 设置已保存（未填写 API Key）");
  }

  async function runAiLayoutAnalysis() {
    const settings = loadAiSettings();
    if (!settings.apiKey) {
      openAiSettings();
      toast("请先配置 AI 服务，再点击 AI 精确解析");
      return;
    }
    if (!importContext.image) {
      toast("请先导入一张简历图片");
      return;
    }
    const button = $("#aiAnalyzeButton");
    if (button) button.disabled = true;
    $("#importStatus").textContent = "AI 正在解析版式，图片将发送到你配置的服务商…";
    try {
      const template = await analyzeLayoutWithAi(importContext.image, settings);
      applyTemplate(template);
      importContext.features = {
        ...(importContext.features || {}),
        template: template.layout.template,
        shape: template.theme.headerShape,
        density: template.theme.density,
        margin: template.page.margin,
        showPhoto: template.theme.showPhoto
      };
      importContext.palette = { ...(importContext.palette || {}), accent: template.theme.accent };
      $("#importStatus").textContent = `AI 已应用：${template.name}`;
      $("#importModal").hidden = true;
      toast("AI 版式已应用，正在继续处理内容");
      await continueImageImport();
    } catch (error) {
      console.warn(error);
      $("#importStatus").textContent = "AI 解析失败，已保留本地解析结果";
      toast(`AI 解析失败：${String(error.message || error).slice(0, 60)}`);
    } finally {
      if (button) button.disabled = false;
    }
  }

  // Fragment 90: event binding and app startup.

  function bindStyleRange(inputId, key, outputId, format) {
    $(inputId).addEventListener("input", e => {
      state[key] = Number(e.target.value);
      $(outputId).textContent = format(state[key]);
      renderPreview();
      saveState();
    });
  }

  function bindEvents() {
    $$(".step").forEach(btn => btn.addEventListener("click", () => switchPanel(btn.dataset.step)));
    $("#collapseAll").addEventListener("click", () => {
      if (ui.openGroups.size) ui.openGroups.clear();
      else ui.openGroups = new Set(SECTION_META.map(m => m.id));
      renderEditor();
    });
    $("#editorList").addEventListener("click", e => {
      const toggle = e.target.closest("[data-toggle-group]");
      if (toggle) {
        const id = toggle.dataset.toggleGroup;
        ui.openGroups.has(id) ? ui.openGroups.delete(id) : ui.openGroups.add(id);
        renderEditor(); return;
      }
      const add = e.target.closest("[data-add]");
      if (add) { addItem(add.dataset.add); return; }
      const move = e.target.closest("[data-move]");
      if (move) { moveItem(move.dataset.move, +move.dataset.index, move.dataset.dir); return; }
      const del = e.target.closest("[data-delete]");
      if (del) { deleteItem(del.dataset.delete, +del.dataset.index); return; }
      if (e.target.closest("#changePhoto")) $("#photoInput").click();
      if (e.target.closest("#removePhoto")) { state.photo = ""; renderEditor(); renderPreview(); saveState(); }
    });
    $("#addSection").addEventListener("click", () => { ui.openGroups.add("custom"); switchPanel("content"); addItem("custom"); });
    $("#presetGrid").addEventListener("click", e => {
      const card = e.target.closest("[data-preset]");
      if (!card) return;
      const preset = PRESETS.find(p => p.id === card.dataset.preset);
      state.template = preset.id; state.accent = preset.accent; state.headerShape = preset.shape;
      renderPreview(); updateStyleControls(); saveState();
    });
    $("#swatchList").addEventListener("click", e => {
      const swatch = e.target.closest("[data-swatch]");
      if (!swatch) return;
      state.accent = swatch.dataset.swatch; renderPreview(); updateStyleControls(); saveState();
    });
    $("#accentColor").addEventListener("input", e => { state.accent = e.target.value; renderPreview(); saveState(); });
    $("#densityRange").addEventListener("input", e => { state.density = +e.target.value; $("#densityValue").textContent = state.density < 90 ? "紧凑" : state.density > 102 ? "舒展" : "舒适"; renderPreview(); saveState(); });
    $("#headerShape").addEventListener("change", e => { state.headerShape = e.target.value; renderPreview(); saveState(); });
    bindStyleRange("#headerHeightRange", "headerHeight", "#headerHeightValue", value => `${value}px`);
    bindStyleRange("#radiusRange", "radius", "#radiusValue", value => `${value}px`);
    bindStyleRange("#cardRadiusRange", "cardRadius", "#cardRadiusValue", value => `${value}px`);
    bindStyleRange("#sectionGapRange", "sectionGap", "#sectionGapValue", value => `${value}px`);
    bindStyleRange("#lineHeightRange", "lineHeight", "#lineHeightValue", value => Number(value).toFixed(2));
    $("#workCardStyle").addEventListener("change", e => { state.workCardStyle = e.target.value; renderPreview(); saveState(); });
    $("#resetTokensButton").addEventListener("click", () => {
      ["headerHeight", "radius", "cardRadius", "sectionGap", "lineHeight", "workCardStyle"].forEach(key => {
        state[key] = DEFAULT_DATA[key];
      });
      renderPreview();
      updateStyleControls();
      saveState();
      toast("设计 Token 已重置");
    });
    $("#showPhoto").addEventListener("change", e => { state.showPhoto = e.target.checked; renderPreview(); saveState(); });
    $("#pageMargin").addEventListener("change", e => { state.margin = e.target.value; renderPreview(); saveState(); });
    $("#autoFitButton").addEventListener("click", autoFit);
    $("#undoButton").addEventListener("click", undo);
    $("#redoButton").addEventListener("click", redo);
    $("#zoomOut").addEventListener("click", () => setZoom(ui.zoom - .1));
    $("#zoomIn").addEventListener("click", () => setZoom(ui.zoom + .1));
    $("#fitWidth").addEventListener("click", fitWidth);
    $("#fullscreenButton").addEventListener("click", () => {
      $("#paperStage").classList.toggle("is-fullscreen");
      updateZoom();
    });
    $("#exportButton").addEventListener("click", exportPdf);
    $("#importButton").addEventListener("click", openImportModal);
    $("#moreButton").addEventListener("click", () => { $("#moreMenu").hidden = !$("#moreMenu").hidden; });
    $("#moreMenu").addEventListener("click", e => {
      const btn = e.target.closest("[data-action]");
      if (!btn) return;
      $("#moreMenu").hidden = true;
      if (btn.dataset.action === "export-html") exportHtml();
      if (btn.dataset.action === "export-json") exportJson();
      if (btn.dataset.action === "import-json") $("#jsonInput").click();
      if (btn.dataset.action === "export-template") exportTemplate();
      if (btn.dataset.action === "import-template") $("#templateInput").click();
      if (btn.dataset.action === "ai-settings") openAiSettings();
      if (btn.dataset.action === "reset") resetAll();
    });
    $("#chooseImageButton").addEventListener("click", () => $("#imageInput").click());
    $("#useLocalLayoutButton").addEventListener("click", useLocalLayout);
    $("#aiAnalyzeButton").addEventListener("click", runAiLayoutAnalysis);
    $("#aiProvider").addEventListener("change", updateAiPlaceholders);
    $("#saveAiSettingsButton").addEventListener("click", saveAiSettingsFromForm);
    $("#dropZone").addEventListener("click", () => $("#imageInput").click());
    $("#dropZone").addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") $("#imageInput").click(); });
    ["dragenter", "dragover"].forEach(type => $("#dropZone").addEventListener(type, e => { e.preventDefault(); $("#dropZone").classList.add("is-over"); }));
    ["dragleave", "drop"].forEach(type => $("#dropZone").addEventListener(type, e => { e.preventDefault(); $("#dropZone").classList.remove("is-over"); }));
    $("#dropZone").addEventListener("drop", e => beginImageImport(e.dataTransfer.files[0]));
    $("#imageInput").addEventListener("change", e => { if (e.target.files[0]) beginImageImport(e.target.files[0]); e.target.value = ""; });
    $("#photoInput").addEventListener("change", async e => {
      const file = e.target.files[0];
      if (!file) return;
      state.photo = await readFileAsDataURL(file);
      renderEditor(); renderPreview(); saveState(); toast("头像已更新");
      e.target.value = "";
    });
    $("#jsonInput").addEventListener("change", async e => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const parsed = JSON.parse(await readFileAsText(file));
        state = normalizeData(parsed);
        if (!state.photo) state.photo = DEMO_AVATAR;
        renderEditor(); renderPreview(); updateStyleControls(); saveState();
        toast("JSON 内容已导入");
      } catch { toast("JSON 文件格式不正确"); }
      e.target.value = "";
    });
    $("#templateInput").addEventListener("change", async e => {
      const file = e.target.files[0];
      if (!file) return;
      await importTemplateFile(file);
      e.target.value = "";
    });
    $$("[data-close-modal]").forEach(btn => btn.addEventListener("click", () => {
      $("#importModal").hidden = true;
      $("#ocrModal").hidden = true;
      $("#aiModal").hidden = true;
    }));
    $$(".modal-backdrop").forEach(backdrop => backdrop.addEventListener("click", e => { if (e.target === backdrop) backdrop.hidden = true; }));
    $("#applyOcrButton").addEventListener("click", () => applyImportedStyle(true));
    window.addEventListener("beforeprint", () => { preparePrintRoot(); });
    window.addEventListener("afterprint", () => { $("#printRoot").innerHTML = ""; });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        $("#importModal").hidden = true; $("#ocrModal").hidden = true; $("#aiModal").hidden = true; $("#moreMenu").hidden = true;
        $("#paperStage").classList.remove("is-fullscreen"); updateZoom();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
        e.preventDefault();
        redo();
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") { e.preventDefault(); saveState(false); }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") { e.preventDefault(); exportPdf(); }
    });
    document.addEventListener("click", e => {
      if (!e.target.closest(".topbar-actions")) $("#moreMenu").hidden = true;
    });
    window.addEventListener("resize", () => updateZoom());
  }

  function init() {
    renderEditor();
    renderPreview();
    renderPresets();
    updateStyleControls();
    bindEvents();
    resetHistory();
    if (window.innerWidth < 760) {
      ui.zoom = .46;
      updateZoom();
    } else {
      setTimeout(fitWidth, 80);
    }
    if (new URLSearchParams(location.search).has("test")) {
      window.__RS_TEST__ = { analyzeLayout, analyzeImage, classifyLayoutSignals, parseResumeText, normalizeData };
    }
  }

  init();
})();
