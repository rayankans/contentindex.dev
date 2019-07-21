import { combineReducers } from 'redux';

import { ADD_ARTICLES, SAVE_ARTICLE, DELETE_ARTICLE } from './actions.js';


function fetchedArticles(state = [], action) {
  if (action.type !== ADD_ARTICLES)
    return state;

  return [...state].concat(action.articles);
}


function savedArticles(state = [], action) {
  if (action.type === SAVE_ARTICLE) {
    const newState = [...state];
    newState.push(action.article);
    return newState;
  }

  if (action.type === DELETE_ARTICLE) {
    const savedArticles = [];
    for (const article of state) {
      if (article.url !== action.article.url) {
        savedArticles.push(article);
      }
    }
    return savedArticles;
  }

  return state;
}

export default combineReducers({
  fetchedArticles,
  savedArticles,
});
