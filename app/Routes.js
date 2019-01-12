import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import ProductPage from './containers/ProductPage';
import SellPage from './containers/SellPage';


export default () => (
  <App>
    <Switch>
      <Route path={routes.COUNTER} component={CounterPage} />
      <Route path={routes.PRODUTOS} component={ProductPage} />
      <Route path={routes.SELL} component={SellPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
