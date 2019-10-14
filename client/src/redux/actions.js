
export const FETCH_ARTICLES = 'FETCH_ARTICLES';
export const SAVE_ARTICLE = 'SAVE_ARTICLE';
export const DELETE_ARTICLE = 'DELETE_ARTICLE';

export function addArticles(articles) {
  return {
    type: FETCH_ARTICLES,
    articles,
  };
}

export function saveArticle(article) {
  return {
    type: SAVE_ARTICLE,
    article,
  };
}

export function deleteArticle(id) {
  return {
    type: DELETE_ARTICLE,
    id,
  };
}
