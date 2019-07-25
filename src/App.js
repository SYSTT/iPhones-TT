import React, { Component } from 'react';
import './App.css';

import EvaluationForm from './components/forms/EvaluationForm';
import DeviceForm from './components/forms/DeviceForm';

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
          <header><h1>iPhones TT</h1></header>
          <div className="App-form">
            { !this.state.evaluationResults &&
            <EvaluationForm handleSubmit={this.handleEvaluationSubmit} /> }
            { this.state.evaluationResults && !this.state.deviceResults &&
            <DeviceForm handleSubmit={this.handleDeviceSubmit} /> }
            { this.state.evaluationResults && this.state.deviceResults &&
            <DeviceForm handleSubmit={this.handleDeviceSubmit} /> }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
