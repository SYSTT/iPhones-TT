import React from 'react';
import './App.css';

import EvaluationForm from './components/forms/EvaluationForm';

function App() {
  return (
    <div className="App">
      <div className="App-content">
        <header><h1>iPhones TT</h1></header>
        <div className="App-form">
          <EvaluationForm />
        </div>
      </div>
    </div>
  );
}

export default App;
