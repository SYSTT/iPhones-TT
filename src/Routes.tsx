import React from 'react';
import { Switch, Route } from 'react-router';

import HomePage from './components/HomePage/HomePage';
import CartPage from './components/CartPage/CartPage';
import CheckoutPage from './components/CheckoutPage/CheckoutPage';
import LoginPage from './components/LoginPage/LoginPage';
import AdminPage from './components/AdminPage/AdminPage';

import { useAuth } from './modules/auth/auth';

function Routes() {
  const { user } = useAuth();

  return (
    <Switch>
      <Route
        path="/cart"
        component={CartPage}
      />
      <Route
        path="/checkout"
        component={CheckoutPage}
      />
      <Route
        path="/login"
        component={LoginPage}
      />
      <Route
        path="/admin"
        render={() => <AdminPage user={user} />}
      />
      <Route
        path="/"
        component={HomePage}
      />
    </Switch>
  );
}

export default Routes;
