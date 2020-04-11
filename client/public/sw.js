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

// TODO: Find a way to de-dup this.
async function writeToCache(article) {
  // TODO: Don't hardcode the cache name.
  const cache = await caches.open('content');
  const responses = await Promise.all([
      fetch(article.url, { mode: 'no-cors' }),
      fetch(article.thumbnail, { mode: 'no-cors' }),
      idbKeyval.set(article.id, JSON.stringify(article)),
  ]);

  await Promise.all([
    cache.put(`/content/${article.id}`, responses[0]),
    cache.put(`/icon/${article.id}`, responses[1]),
  ]);
}

self.addEventListener('push', async event => {
  event.waitUntil((async () => {
    const payload = event.data.json();
    console.log(payload);
    await writeToCache(payload);
    const options = {
      body: 'Press F for this sad chonk',
      icon: payload.thumbnail,
      data: payload,
    };
    await self.registration.showNotification('Look at this sad C H O N K', options);
  })());
});

self.addEventListener('notificationclick', event => {
  const clickedNotification = event.notification;
  event.waitUntil((async () => {
    const clientWindow = await clients.openWindow(`/article/${clickedNotification.data.id}`);
    clickedNotification.close();
    if (clientWindow) await clientWindow.focus();
  })());
});
