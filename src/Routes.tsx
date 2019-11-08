import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useAuth } from './modules/auth';

import HomePage from './pages/HomePage/HomePage';
import AdminPage from './pages/AdminPage';
import BuyPage from './pages/BuyPage';
import CartPage from './pages/CartPage';
import TradePage from './pages/TradePage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import { useUserData } from './modules/userData';
import PostCheckoutPage from './pages/PostCheckoutPage';

const Routes: React.FC = () => {
  const { user } = useAuth();
  const { logoutUser } = useUserData();

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
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/login" component={LoginPage} />
        <Route
          path="/logout"
          render={({ history }) => {
            const logout = async () => {
              if (user) {
                await logoutUser();
                history.push('/');
              }
            };
            logout();
            return null;
          }}
        />
        <Route path="/post-checkout" render={PostCheckoutPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </>
  );
};

export default Routes;
