import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from './routes';
// import { getRoutes } from './routes';


export default function Root({history, store}) {
  return (
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
  );
}
