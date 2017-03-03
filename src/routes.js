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
// export const paths = {
//   ROOT: '/',
//   SIGN_IN: '/login',
//   TASKS: '/'
// };

//
// const requireAuth = getState => {
//   return (nextState, replace) => {
//     if (!isAuthenticated(getState())) {
//       replace(paths.SIGN_IN);
//     }
//   };
// };
//
// const requireUnauth = getState => {
//   return (nextState, replace) => {
//     if (isAuthenticated(getState())) {
//       replace(paths.TASKS);
//     }
//   };
// };
//
//
// export const getRoutes = getState => {
//   return {
//     path: paths.ROOT,
//     component: App,
//     childRoutes: [
//       {
//         indexRoute: {
//           component: LoginForm,
//           onEnter: requireAuth(getState)
//         }
//       },
//       {
//         path: paths.SIGN_IN,
//         component: SelectedRiversList,
//         onEnter: requireUnauth(getState)
//       }
//     ]
//   };
// };
