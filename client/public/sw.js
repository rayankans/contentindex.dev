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

async function notifyWindowOfDelete(id) {
  const matchedClients = await clients.matchAll({type: 'window'});
  for (const client of matchedClients) {
    client.postMessage({type: 'delete', id});
  }
}

self.addEventListener('contentdelete', event => {
  event.waitUntil(
    // TODO: Don't hardcode the cache name.
    caches.open('content').then(cache => {
      return Promise.all([
        cache.delete(`/icon/${event.id}`),
        cache.delete(`/content/${event.id}`),
        // If there is no window available, the id will be cleared on start-up.
        notifyWindowOfDelete(event.id),
      ])}));
});
