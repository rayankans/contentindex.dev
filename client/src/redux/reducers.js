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

function savedArticleIds(state = [], action) {
  if (action.type === SAVE_ARTICLE) {
    const newState = [...state];
    newState.push(action.id);
    return newState;
  }

  if (action.type === DELETE_ARTICLE) {
    const savedIds = [];
    for (const id of state) {
      if (id !== action.id) {
        savedIds.push(id);
      }
    }
    return savedIds;
  }

  return state;
}

export default combineReducers({
  fetchedArticles,
  savedArticleIds,
});
