import React from 'react';

export default function OfflineArticle(props) {
  const id = props.match.params[0];
  const article = JSON.parse(localStorage.getItem(id));
  if (!article)
    return (<h1> 404 </h1>);

  if (article.type === 'photo') {
    return (<div style={{textAlign: 'center'}}>
      <h1> {article.title} </h1>
      <h2> {article.description} </h2>
      <img alt="" src={`${article.url}?cache`} />
    </div>);
  }

  return (<h1> {JSON.stringify(article, null, 2)} </h1>);
}
