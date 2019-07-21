import React from 'react';
import ReactDOM from 'react-dom';
import TopAppBar from './TopAppBar';
import FullWidthTabs from './content-view/FullWidthTabs';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import {saveArticle} from './redux/actions.js';

function App() {
  return (
  <>
    <TopAppBar />
    <Provider store={store} >
      <FullWidthTabs />
    </Provider>
  </>);
}

ReactDOM.render(<App />, document.getElementById('root'));
navigator.serviceWorker.register('/sw.js');
navigator.serviceWorker.addEventListener('message', e => console.log(e.data));

// Inititalize `store` with saved content.
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const article = localStorage.getItem(key);
  store.dispatch(saveArticle(JSON.parse(article)));
}
