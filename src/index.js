import React from 'react';
import ReactDOM from 'react-dom';
import TopAppBar from './TopAppBar';
import FullWidthTabs from './FullWidthTabs';

function App() {
  return (
  <>
    <TopAppBar />
    <FullWidthTabs />
  </>);
}

ReactDOM.render(<App />, document.getElementById('root'));
