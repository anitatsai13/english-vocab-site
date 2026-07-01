# 英文單字學習網

一個**單一自包含 HTML** 的國中英語單字學習網站(約 1100 字、6 個群組)。
所有資料、程式、樣式都在 `index.html` 一個檔案裡 —— 離線可開、不需安裝任何東西即可修改。

🌐 線上版:https://ai-english-415e25.netlify.app/

---

## 檔案

| 檔案 | 用途 |
|------|------|
| `index.html` | **App 本體(要修改的就是這個)** |
| `netlify_deploy.py` | 自動部署到 Netlify 的腳本(進階、選用) |

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

## 如何更新到線上(Netlify)

**最簡單**:把改好的 `index.html` 到 https://app.netlify.com 網站 `ai-english-415e25` → **Deploys** → 拖進去。網址不變。

**進階**:`netlify_deploy.py`(需 uv + Netlify 權杖,路徑需依電腦調整)。

> 之後也可把此 GitHub repo 連到 Netlify,設定 push 自動部署。
