import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { isAuthenticated } from './AuthSync';
import App from './components/app';
import LoginForm from './components/LoginForm';
import AllRiversList from './components/AllRiversList';
import SelectedRiversList from './components/SelectedRiversList';
import RequireAuth from './components/RequireAuth';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={RequireAuth(SelectedRiversList)} />
    <Route path="all" component={AllRiversList} />
    <Route path="login" component={LoginForm} />
  </Route>
);
