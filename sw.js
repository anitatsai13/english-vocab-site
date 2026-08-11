// 改版策略：index.html／導覽請求走 network-first（有網路就拿新版，離線才回快取），
// 其餘靜態檔維持 cache-first。改版後使用者重新整理即可拿到新版，不必手動清快取。
const CACHE = "english-v2";
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icon.svg"];

// 判斷是不是「主文件」請求：網址列導覽、或直接指到 / 與 /index.html
function isDoc(req, url) {
  return req.mode === "navigate" || /\/(index\.html)?$/.test(url.pathname);
}

self.addEventListener("install", e => {
  self.skipWaiting();
  // cache:"reload" 繞過 HTTP 快取，避免預先存進去的又是舊檔
  e.waitUntil(caches.open(CACHE).then(c =>
    Promise.all(CORE.map(u => fetch(new Request(u, { cache: "reload" }))
      .then(r => (r.ok ? c.put(u, r) : null)).catch(() => {})))
  ).catch(() => {}));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET" || url.origin !== location.origin) return;

  if (isDoc(e.request, url)) {
    // network-first：先問網路，成功就順手更新快取；失敗（離線）才退回快取
    e.respondWith(
      fetch(e.request).then(resp => {
        if (resp && resp.ok) { const cp = resp.clone(); caches.open(CACHE).then(c => c.put("./index.html", cp)).catch(() => {}); }
        return resp;
      }).catch(() => caches.match(e.request).then(r => r || caches.match("./index.html")))
    );
    return;
  }

  // 其餘靜態檔：cache-first
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(resp => {
      const cp = resp.clone();
      caches.open(CACHE).then(c => c.put(e.request, cp)).catch(() => {});
      return resp;
    }).catch(() => caches.match("./index.html")))
  );
});
