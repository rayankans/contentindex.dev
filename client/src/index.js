import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import TopAppBar from './TopAppBar';
import FullWidthTabs from './view/FullWidthTabs';
import OfflineArticle from './view/OfflineArticle';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { setUpStorage } from './storage/content_cache.js';

function App() {
  return (
    <Router>
      <TopAppBar />
      <Provider store={store} >
        <Switch>
          <Route path="/" exact component={FullWidthTabs} />
          <Route path="/article/*" strict component={OfflineArticle} />
          <Redirect to="/" />
        </Switch>
      </Provider>
    </Router>);
}

ReactDOM.render(<App />, document.getElementById('root'));
navigator.serviceWorker.register('/sw.js');
navigator.serviceWorker.addEventListener('message', e => console.log(e.data));

setUpStorage(store.dispatch);
