# 英文單字學習網

一個**單一自包含 HTML** 的國中英語單字學習網站(1319 字、7 個群組)。
所有資料、程式、樣式都在 `index.html` 一個檔案裡 —— 離線可開、不需安裝任何東西即可修改。

🌐 線上版:https://anitatsai13.github.io/english-vocab-site/

---

## 檔案

| 檔案 | 用途 |
|------|------|
| `index.html` | **App 本體(要修改的就是這個)** |
| `sw.js` / `manifest.webmanifest` / `icon.svg` | PWA(可加到手機主畫面、離線可用) |
| `netlify_deploy.py` | 舊的 Netlify 部署腳本,**已停用**(見下) |

---

## 如何修改

1. 用文字編輯器(建議 VS Code)打開 `index.html`。
2. 修改後存檔,用瀏覽器打開同一個檔即可預覽測試。不需要 Python / Node / 網路。

### 內容地圖(用 Ctrl+F 搜尋)

| 搜尋關鍵字 | 內容 |
|-----------|------|
| `const VOCAB` | 所有單字資料 |
| `const GROUPS` | 群組(1上/1下/2上/2下/Eason…) |
| `const EMOJI` | 每個單字的 emoji |
| `const TYPES` / `TYPELABEL` | 測驗題型 |

**單字格式範例**(在 `const VOCAB = [` 內):
```js
{en:"season",pos:"n.",zh:"季節",lesson:"L1",tip:"",rel:"",ex:{en:"There are four seasons in a year.",zh:"一年之中有四個季節。"}},
{"en":"attempt","pos":"v.","zh":"嘗試","lesson":"Voc4","group":"wonderskills","tip":"","rel":"","def":"to try to do something"},
```
- `ex` = 例句(中英);`def` = 英文定義(Wonderskills 用);兩者擇一或留空。
- 新增一字:複製一行改內容,行尾記得逗號;最好也在 `const EMOJI` 加對應 emoji。

---

## 如何更新到線上

線上版由 **GitHub Pages** 提供,直接吃 `main` 分支:

```
git add index.html
git commit -m "說明改了什麼"
git push origin main
```

push 完約 1 分鐘 https://anitatsai13.github.io/english-vocab-site/ 就是新版,**不需要任何手動部署動作**。

`sw.js` 對 `index.html` 採 network-first,使用者重新整理即可拿到新版,不必手動清快取。

### 舊的 Netlify 站(已停用)

`ai-english-415e25.netlify.app` 是早期的線上版,靠 `netlify_deploy.py` 手動上傳,**從未跟著 git 走**,
上面停在很舊的版本(沒有 3上、動詞三態、錯題本)。腳本所需的來源檔與權杖都已不存在,保留僅供參考。
若哪天要重啟,建議直接在 Netlify 後台把本 repo 接上 `main` 自動部署,不要再用這支腳本。
