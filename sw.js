/* =============================================================
   Atrial Compass — service worker (offline + install)

   IMPORTANT: bump VERSION on every release so clients pick up the new
   index.html and assets. Keep it in step with the app version shown in the
   hero footer / version-history modal. A stale VERSION = users stuck on an
   old cached build.
   ============================================================= */
const VERSION = 'v1.4.2';
const CACHE = `atrial-compass-${VERSION}`;

/* Same-origin app shell — precached so the app boots with no network. */
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './favicon.ico',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
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

  /* The HTML document: network-first so a fresh deploy lands when online,
     falling back to the cached shell when offline. */
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match('./index.html').then((r) => r || caches.match('./')))
    );
    return;
  }

  /* Our own static assets: cache-first (they're versioned by VERSION). */
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then((hit) => hit || fetch(req).then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      }))
    );
    return;
  }

  /* Cross-origin (Tailwind CDN, Google Fonts CSS + woff2): stale-while-
     revalidate — serve cache instantly, refresh in the background, and fall
     back to cache when offline. Opaque (no-cors) responses are cached too so
     the fonts/script replay without the network. */
  event.respondWith(
    caches.match(req).then((hit) => {
      const network = fetch(req).then((res) => {
        if (res && (res.ok || res.type === 'opaque')) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => hit);
      return hit || network;
    })
  );
});
