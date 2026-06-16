專案名稱: Recommander-like Explorer (MVP)

目標 (MVP):
- 核心檔案總管：支援分頁開啟、分頁複製/移動/刪除、快速檔案操作
- AI agent 整合：在任一路徑可呼叫 agent 執行任務（側欄或分割視窗）

設計原則:
- 開檔速度快、記憶體佔用低（評估 Electron + Rust/Go 原生模組或 WinUI/Win32 原生實作）
- 支援壓縮檔預覽、縮圖窗格與多格式快速開啟

初始技術棧（建議）：
- UI: React + Electron / 或 WinUI + React WebView
- 背端/原生: Rust 或 Go 用於快速檔案 I/O 與解壓縮
- AI agent: 本地 subprocess + 可選雲端 backend

交付物:
- PROJECT_BRIEF.md
- docs/sprint-1/{plan.md,progress.md}
- 初始 TODOs

團隊分工概覽:
- Nova: UI 組件、分頁與效能調校
- Sage: 檔案 I/O、原生程式整合、agent API
- Milo: 視覺系統、縮圖、體驗一致性
