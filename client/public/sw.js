// Import the default react SW that caches content.
importScripts('service-worker.js');

self.addEventListener('install', event => {
  event.waitUntil(caches.open('static-content')
      .then(cache => cache.add('/favicon.png'))
      .then(() => skipWaiting()));
});

self.addEventListener('activate', event => event.waitUntil(clients.claim()));

self.addEventListener('fetch', event => {
  if (event.request.url.includes('/content/') ||
      event.request.url.includes('/icon/') ||
      event.request.url.endsWith('/favicon.png')) {
    event.respondWith(caches.match(event.request.url, {ignoreSearch: true}));
  }
});
