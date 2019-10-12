// Import the default react SW that caches content.
importScripts('service-worker.js');
importScripts('/util/idb-keyval-iife.min.js');

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
    return;  // Only notify one window.
  }
}

self.addEventListener('contentdelete', event => {
  event.waitUntil(
    // TODO: Don't hardcode the cache name.
    caches.open('content').then(cache => {
      return Promise.all([
        cache.delete(`/icon/${event.id}`),
        cache.delete(`/content/${event.id}`),
        idbKeyval.del(event.id),
        notifyWindowOfDelete(event.id),
      ])}));
});
