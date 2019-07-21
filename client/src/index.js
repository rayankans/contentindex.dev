import React from 'react';
import ReactDOM from 'react-dom';
import TopAppBar from './TopAppBar';
import FullWidthTabs from './content-view/FullWidthTabs';

function App() {
  return (
  <>
    <TopAppBar />
    <FullWidthTabs />
  </>);
}

ReactDOM.render(<App />, document.getElementById('root'));
navigator.serviceWorker.register('/sw.js');
navigator.serviceWorker.addEventListener('message', e => console.log(e.data));