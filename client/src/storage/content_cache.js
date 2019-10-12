import * as idb from 'idb-keyval';
import { saveArticle } from '../redux/actions.js';

const CACHE_NAME = 'content';

async function writeToCache(article) {
  const cache = await caches.open(CACHE_NAME);
  const responses = await Promise.all([
      fetch(article.url, { mode: 'no-cors' }),
      fetch(article.thumbnail, { mode: 'no-cors' }),
  ]);
  await cache.put(`/content/${article.id}`, responses[0]);
  await cache.put(`/icon/${article.id}`, responses[1]);
}

async function clearCache(article) {
  const cache = await caches.open(CACHE_NAME);
  await cache.delete(`/content/${article.id}`);
  await cache.delete(`/icon/${article.id}`);
}

async function registerContent(article) {
  const registration = await navigator.serviceWorker.ready;
  
  if (!registration.index)
    return;

  try {
    await registration.index.add({
      // The id & url are needed to delete content from the SW.
      id: article.id,
      title: article.title,
      description: article.description,
      category: article.type === 'photo' ? 'article' : article.type,
      icons: [{src: article.thumbnail}],
      launchUrl: article.type === 'homepage' ? '/' : `/article/${article.id}`,
    });
  } catch (e) {
    // API is still experimental.
    console.log('Failed to register content: ', e.message);
  }
}

async function unregisterContent(article) {
  const registration = await navigator.serviceWorker.ready;
  
  if (!registration.index)
    return;

  await registration.index.delete(article.id);
}

export async function storeContent(article) {
  await Promise.all([
    writeToCache(article),
    registerContent(article),
  ]);

  await idb.set(article.id, JSON.stringify(article));
}

export async function clearContent(article) {
  await Promise.all([
    clearCache(article),
    unregisterContent(article),
  ]);

  await idb.del(article.id);
}

export async function getStoredArticles() {
  const keys = await idb.keys();
  const articles = await Promise.all(keys.map(k => idb.get(k)));
  return articles.map(a => JSON.parse(a));
}

export async function setUpStorage(dispatch) {
  // Migrate stuff from localStorage to idb.
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    await idb.set(key, localStorage.getItem(key));
  }
  localStorage.clear();

  (await getStoredArticles()).forEach(article => dispatch(saveArticle(article.id)));
}

export async function saveCustomContent(article, responseContent) {
  const cache = await caches.open(CACHE_NAME);
  if (responseContent)
    await cache.put(`/content/${article.id}`, responseContent);
  await cache.put(`/icon/${article.id}`, await fetch(article.thumbnail, { mode: 'no-cors' }));
  await registerContent(article);
}

export async function clearAll() {
  await caches.delete(CACHE_NAME);

  const allIds = await idb.keys();
  const registration = await navigator.serviceWorker.ready;
  if (registration.index)
    await Promise.all(allIds.map(id => registration.index.delete(id)));

  await idb.clear();
  return allIds;
}
