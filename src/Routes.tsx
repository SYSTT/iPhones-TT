import React from 'react';
import { Switch, Route } from 'react-router';

import { useAuth } from './modules/auth/auth';

import HomePage from './components/HomePage/HomePage';
import AdminPage from './components/AdminPage';
import BuyPage from './components/BuyPage';
import CartPage from './components/CartPage';

function Routes() {
  const { user } = useAuth();

  return (
    <>
    <Switch>
      <Route
        path="/admin"
        render={() => <AdminPage user={user} />}
      />
      <Route
        path="/buy"
        component={BuyPage}
      />
      <Route
        path="/cart"
        component={CartPage}
      />
      <Route
        path="/"
        component={HomePage}
      />
    </Switch>
    </>
  );
}

export default Routes;
