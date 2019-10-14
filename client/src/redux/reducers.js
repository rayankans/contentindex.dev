import { combineReducers } from 'redux';

import { FETCH_ARTICLES, SAVE_ARTICLE, DELETE_ARTICLE } from './actions.js';

function fetchedArticles(state = [], action) {
  if (action.type !== FETCH_ARTICLES)
    return state;

  if (!action.articles)
    return null;
  if (!action.articles.length)
    return [];

  return [...state].concat(action.articles);
}

function savedArticles(state = [], action) {
  if (action.type === SAVE_ARTICLE) {
    const newState = [...state];
    newState.push(action.article);
    return newState;
  }

  if (action.type === DELETE_ARTICLE) {
    const articles = [];
    for (const article of state) {
      if (article.id !== action.id) {
        articles.push(article);
      }
    }
    return articles;
  }

  return state;
}

export default combineReducers({
  fetchedArticles,
  savedArticles,
});
