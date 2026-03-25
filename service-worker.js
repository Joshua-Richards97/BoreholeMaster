const CACHE_VERSION = 'borehole-master-v38';
const ASSETS = [
  './',
  './borehole-calculator.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_VERSION).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // HTML (entry point) → ALWAYS network first for instant updates
  if (e.request.destination === 'document') {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
    return;
  }
  // Everything else → cache-first
  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE_VERSION).then(cache => cache.put(e.request, clone));
        return res;
      });
    })
  );
});
