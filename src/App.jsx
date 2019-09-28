import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import EstimationPage from './components/EstimationPage/EstimationPage';
import BuyPage from './components/BuyPage/BuyPage';
import CartPage from './components/CartPage/CartPage';
import CheckoutPage from './components/CheckoutPage/CheckoutPage';
import LoginPage from './components/LoginPage/LoginPage';

import { withFirebase } from './components/Firebase/context';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-content">
          <Header />
          <Switch>
            <Route
              path="/buy"
              component={BuyPage}
            />
            <Route
              path="/cart"
              component={CartPage}
            />
            <Route
              path="/checkout"
              component={CheckoutPage}
            />
            <Route
              path="/estimate"
              component={EstimationPage}
            />
            <Route
              path="/login"
              component={LoginPage}
            />
            <Route
              path="/"
              component={HomePage}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withFirebase(App);
