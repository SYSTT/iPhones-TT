import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Header from './components/Header/Header';
import EvaluationForm from './components/forms/EvaluationForm';
import HomePage from './components/HomePage/HomePage';

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      evaluationResults: null,
      deviceResults: null,
      contactResults: null,
    };
  }

  componentDidMount = async () => {
    const res = await fetch('./pricelist.json');
    const priceTable = await res.json();
    this.setState({ priceTable });
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
              path="/estimate"
              render={() => 
                <EvaluationForm
                  handleSubmit={this.handleEvaluationSubmit}
                  priceTable={this.state.priceTable}
                />
              }
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
