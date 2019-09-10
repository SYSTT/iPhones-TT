import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import EstimationPage from './components/EstimationPage/EstimationPage';
import BuyPage from './components/BuyPage/BuyPage';
import CartPage from './components/CartPage/CartPage';

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      evaluationResults: null,
      deviceResults: null,
      contactResults: null,
    };
  }

  handleEvaluationSubmit = (results) => {
    this.setState({ evaluationResults: results });
  }

  handleDeviceSubmit = (results) => {
    this.setState({ deviceResults: results });
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
              path="/estimate"
              component={EstimationPage}
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

export default App;
