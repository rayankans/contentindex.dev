self.addEventListener('install', event => {
  event.waitUntil(skipWaiting());
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  if (event.request.url.endsWith('?cache')) {
    event.respondWith(caches.match(event.request.url, {ignoreSearch: true}));
  }
});