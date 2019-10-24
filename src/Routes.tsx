import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useAuth } from './modules/auth';

import HomePage from './components/HomePage/HomePage';
import AdminPage from './components/AdminPage';
import BuyPage from './components/BuyPage';
import CartPage from './components/CartPage';
import TradePage from './components/TradePage';

const Routes: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <Switch>
        <Route
          exact
          strict
          path="/:url*"
          render={props => <Redirect to={`${props.location.pathname}/`} />}
        />
        <Route path="/admin" render={() => <AdminPage user={user} />} />
        <Route path="/trade" component={TradePage} />
        <Route path="/buy" component={BuyPage} />
        <Route path="/cart" component={CartPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </>
  );
};

export default Routes;
