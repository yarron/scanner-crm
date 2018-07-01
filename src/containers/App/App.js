import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';

import '_assets/styles/common.scss';

import config from '../../config';
import routes from '../../routes';

const App = () => {
  const RouteWithSubRoutes = route => (
    <Route
      key={route.path}
      exact={route.exact || false}
      path={route.path}
      render={props => (
        <route.component {...props} routes={route.routes || null} />
      )}
    />
  );

  return (
    <div>
      <Helmet {...config.app} />
      <Switch>{routes.map(route => RouteWithSubRoutes(route))}</Switch>
    </div>
  );
};

export default App;
