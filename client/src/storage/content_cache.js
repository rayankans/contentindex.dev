
import { saveArticle, deleteArticle } from '../redux/actions.js';

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

  await registration.index.add({
    // The id & url are needed to delete content from the SW.
    id: article.id,
    title: article.title,
    description: article.description,
    category: article.type === 'photo' ? 'article' : article.type,
    icons: [{src: article.thumbnail}],
    launchUrl: article.type === 'homepage' ? '/' : `/article/${article.id}`,
  });
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

  localStorage.setItem(article.id, JSON.stringify(article));
}

export async function clearContent(article) {
  await Promise.all([
    clearCache(article),
    unregisterContent(article),
  ]);

  localStorage.removeItem(article.id);
}

export function getStoredArticles() {
  const articles = [];
  for (let i = 0; i < localStorage.length; i++)
    articles.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
  return articles;
}

export async function setUpStorage(dispatch) {
  getStoredArticles().forEach(article => dispatch(saveArticle(article.id)));

  const registration = await navigator.serviceWorker.ready;

  if (!registration.index) {
    // nothing to do here.
    return;
  }

  const descriptions = await registration.index.getAll();
  if (descriptions.length === localStorage.length) {
    // nothing to do here.
    return;
  }

  const articleIds = getStoredArticles().map(article => article.id);
  const descriptionIds = descriptions.map(description => description.id);

  // Remove items in localStorage that are not in descriptions.
  articleIds.filter(articleId => !descriptionIds.includes(articleId))
            .forEach(deletedId => {
              localStorage.removeItem(deletedId);
              dispatch(deleteArticle(deletedId));
            });
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

  const allIds = getStoredArticles().map(article => article.id);

  const registration = await navigator.serviceWorker.ready;
  if (registration.index)
    await Promise.all(allIds.map(id => registration.index.delete(id)));

  localStorage.clear();
  return allIds;
}
