const cacheName = "DuckStudios-DuckStudiosReviewGame-5.0";
const contentToCache = [
    "Build/Build.loader.js",
    "Build/Build.framework.js",
    "Build/Build.data.0",
    "Build/Build.data.1",
    "Build/Build.data.2",
    "Build/Build.wasm",
    "TemplateData/style.css"
];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      if (response) { return response; }
      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      cache.put(e.request, response.clone());
      return response;
    })());
});
