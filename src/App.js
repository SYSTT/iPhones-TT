import React, { Component } from 'react';
import './App.css';

import EvaluationForm from './components/forms/EvaluationForm';

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      evaluationResults: null, 
    };
  }

  handleEvaluationSubmit = (results) => {
    this.setState({ evaluationResults: results });
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-content">
          <header><h1>iPhones TT</h1></header>
          <div className="App-form">
            { !this.state.evaluationResults &&
            <EvaluationForm handleSubmit={this.handleEvaluationSubmit} /> }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
