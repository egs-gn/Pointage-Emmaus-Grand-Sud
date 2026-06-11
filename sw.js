const CACHE = "pointage-v2";
const FILES = [
  "/Pointage-Emmaus-Grand-Sud/",
  "/Pointage-Emmaus-Grand-Sud/index.html",
  "/Pointage-Emmaus-Grand-Sud/manifest.json",
  "/Pointage-Emmaus-Grand-Sud/icon-192.png",
  "/Pointage-Emmaus-Grand-Sud/icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => clients.claim())
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match("/Pointage-Emmaus-Grand-Sud/index.html")))
  );
});
