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
          <header><h1>iPhones TT</h1></header>
          <div className="App-form">
            <EvaluationForm
              handleSubmit={this.handleEvaluationSubmit}
              priceTable={this.state.priceTable}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
