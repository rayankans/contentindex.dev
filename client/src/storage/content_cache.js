
import { saveArticle, deleteArticle } from '../redux/actions.js';

const CACHE_NAME = 'content';

function contentIndexId(article) {
  return JSON.stringify({
    id: article.id,
    url: article.url,
  });
}

async function writeToCache(article) {
  const cache = await caches.open(CACHE_NAME);
  const response = await fetch(article.url, { mode: 'no-cors' });
  await cache.put(article.url, response);
}

async function clearCache(article) {
  const cache = await caches.open(CACHE_NAME);
  await cache.delete(article.url);
}

async function registerContent(article) {
  localStorage.setItem(article.id, JSON.stringify(article));

  const registration = await navigator.serviceWorker.ready;
  
  if (!registration.index)
    return;
  
  await registration.index.add({
    // The id & url are needed to delete content from the SW.
    id: contentIndexId(article),
    title: article.title,
    description: article.description,
    category: article.type === 'video' ? 'video' : 'article',
    iconUrl: article.thumbnail,
    launchUrl: `/article/${article.id}/`,
  }); 
}

async function unregisterContent(article) {
  localStorage.removeItem(article.id);

  const registration = await navigator.serviceWorker.ready;
  
  if (!registration.index)
    return;

  await registration.index.delete(contentIndexId(article));
}

export async function storeContent(article) {
  await Promise.all([
    writeToCache(article),
    registerContent(article),
  ]);
}

export async function clearContent(article) {
  await Promise.all([
    clearCache(article),
    unregisterContent(article),
  ]);
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

  const descriptions = navigator.serviceWorker.getDescriptions();
  if (descriptions.length === localStorage.length) {
    // nothing to do here.
    return;
  }

  const articleIds = getStoredArticles().map(article => article.id);
  const descriptionIds = descriptions.map(description => JSON.parse(description.id).id);

  // Remove items in localStorage that are not in descriptions.
  articleIds.filter(articleId => !descriptionIds.includes(articleId))
            .forEach(deletedId => {
              localStorage.removeItem(deletedId);
              dispatch(deleteArticle(deletedId));
            });
}
