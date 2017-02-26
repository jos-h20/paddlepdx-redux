import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import LoginForm from './components/LoginForm';
import AllRiversList from './components/AllRiversList';
import SelectedRiversList from './components/SelectedRiversList';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import promise from 'redux-promise';
import { Router, browserHistory } from 'react-router';
import reducers from './reducers';
import Async from './Async';
import * as Actions from './actions';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginForm} />
    <Route path="all" component={AllRiversList} />
    <Route path="selected" component={SelectedRiversList} />
  </Route>
);
