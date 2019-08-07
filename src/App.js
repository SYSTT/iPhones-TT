import React, { Component } from 'react';
import './App.css';

import Header from './components/Header/Header';
import EvaluationForm from './components/forms/EvaluationForm';

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
