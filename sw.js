/* Cortex Service Worker
   - App-Shell wird vorab gecached -> App startet offline.
   - Versionierter Cache: Die Version kommt aus der Registrierungs-URL
       navigator.serviceWorker.register('sw.js?v=1.0.0')
     d. h. index.html (APP_VERSION) ist die EINZIGE Quelle der Versionsnummer.
     Bei neuer Version aendert sich die SW-URL -> neuer SW -> neuer Cache-Name,
     und ALTE Caches werden in 'activate' geloescht (kein Festhalten alter Staende).
   - Navigation: network-first -> frische Version, offline Fallback aus Cache.
   - Eigene Assets: stale-while-revalidate.
   - Schriftarten (cross-origin): cache-first (auch "opaque"); offline greifen
     sonst die System-Schrift-Fallbacks aus dem CSS.
*/
const APP_VERSION = new URL(self.location).searchParams.get('v') || '0';
const CACHE = 'cortex-v' + APP_VERSION;
const SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon-180.png'
];

// Nur unbedenkliche Antworten cachen (keine umgeleiteten/Fehler-Antworten).
function cacheable(res) {
  if (!res) return false;
  if (res.redirected) return false;                 // put() wuerde sonst werfen
  return res.ok || res.type === 'opaque' || res.status === 0;
}
function putInCache(req, res) {
  if (!cacheable(res)) return;
  const copy = res.clone();
  caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;

  // 1) Seiten-Navigation: erst Netzwerk (frische Version), sonst Cache.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => { putInCache('./index.html', res); return res; })
        .catch(() => caches.match('./index.html').then((r) => r || caches.match('./')))
    );
    return;
  }

  // 2) Eigene statische Assets: stale-while-revalidate.
  if (sameOrigin) {
    event.respondWith(
      caches.match(req).then((cached) => {
        const network = fetch(req)
          .then((res) => { putInCache(req, res); return res; })
          .catch(() => cached);
        return cached || network;
      })
    );
    return;
  }

  // 3) Cross-Origin (z. B. Google Fonts): cache-first, danach fuellen.
  //    Bei Offline-Fehlschlag benigne leere Antwort -> CSS-Fallback greift, kein Konsolenfehler.
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => { putInCache(req, res); return res; })
        .catch(() => new Response('', { status: 504, statusText: 'offline' }));
    })
  );
});
