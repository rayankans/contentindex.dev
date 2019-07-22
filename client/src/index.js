import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import TopAppBar from './TopAppBar';
import FullWidthTabs from './content-view/FullWidthTabs';
import OfflineArticle from './content-view/OfflineArticle';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import {saveArticle} from './redux/actions.js';

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

// Inititalize `store` with saved content.
for (let i = 0; i < localStorage.length; i++) {
  store.dispatch(saveArticle(localStorage.key(i)));
}
