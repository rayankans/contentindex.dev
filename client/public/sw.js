self.addEventListener('install', event => {
  event.waitUntil(skipWaiting());
});

self.addEventListener('activate', async event => {
  event.waitUntil(clients.claim());
});
