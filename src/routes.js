import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import LoginForm from './components/LoginForm';
import AllRiversList from './components/AllRiversList';
import SelectedRiversList from './components/SelectedRiversList';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginForm} />
    <Route path="all" component={AllRiversList} />
    <Route path="selected" component={SelectedRiversList} />
  </Route>
);
