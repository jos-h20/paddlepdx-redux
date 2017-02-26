import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import promise from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import App from './components/app';
import reducers from './reducers';
import Async from './Async';
import Root from './root';
import { verifyAuth } from './AuthSync';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk, Async)(createStore);

const store = createStoreWithMiddleware(reducers);

const rootElement = document.querySelector('.main');


function render(Root) {
  ReactDOM.render(
      <Root history={browserHistory} store={store} />,
    rootElement
  );
}

verifyAuth(store.dispatch)
  .then(() => render(Root))
  .catch(error => console.error(error)); //
