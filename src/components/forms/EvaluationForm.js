import React, { Component } from 'react';
import './Form.css';
import './EvaluationForm.css';

class EvaluationForm extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      model: 'iphone6s',
      memory: '16gb',
      goodScreenCondition: false,
      goodBatteryCondition: false,
      goodBodyCondition: false,
      submitted: false,
    };
  }

  handleModelChange = (e) => {
    this.setState({ model: e.target.value });
  }

  handleMemoryChange = (e) => {
    this.setState({ memory: e.target.value });
  }

  toggleGoodScreenCondition = (e) => {
    this.setState({ goodScreenCondition: e.target.checked });
  }

  toggleGoodBatteryCondition = (e) => {
    this.setState({ goodBatteryCondition: e.target.checked });
  }

  toggleGoodBodyCondition = (e) => {
    this.setState({ goodBodyCondition: e.target.checked });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      model,
      memory,
      goodScreenCondition,
      goodBatteryCondition,
      goodBodyCondition
    } = this.state;

    if (!goodScreenCondition) {
      alert('We only accept iphones with screens in good condition right now.')
      return;
    }
    if (!goodBatteryCondition) {
      alert('We only accept iphones with batteries in good condition right now.')
      return;
    }
    if (!goodBodyCondition) {
      alert('We only accept iphones with bodies in good condition right now.')
      return;
    }

    this.setState({
      buyingPrice: this.props.priceTable[model][memory] || 'None',
      submitted: true,
    }, () => {
      this.props.handleSubmit(this.state);
    });
  }
  
  render() {
    return (
      <div className="EvaluationForm">
        <h1>Evaluation</h1>
        <p>Submit some information on the iPhone model that you want to trade in.</p>
        <br/>
        <form>
          <div className="Form-field">
            <label className="Form-label" htmlFor="model"><p>Model:</p></label>
            <select
              name="model"
              id="model"
              onChange={this.handleModelChange}
              value={this.state.model}
            >
              <option value="iphone6s">iPhone 6s</option>
              <option value="iphone6splus">iPhone 6s Plus</option>
              <option value="iphone7">iPhone 7</option>
              <option value="iphone7plus">iPhone 7 Plus</option>
              <option value="iphone8">iPhone 8</option>
              <option value="iphone8plus">iPhone 8 Plus</option>
              <option value="iphonex">iPhone X</option>
              <option value="iphonexr">iPhone XR</option>
              <option value="iphonexs">iPhone XS</option>
              <option value="iphonexsmax">iPhone XS Max</option>
            </select>
          </div>
          <div className="Form-field">
            <label className="Form-label" htmlFor="memory"><p>Memory:</p></label>
            <select
              name="memory"
              id="memory"
              onChange={this.handleMemoryChange}
              value={this.state.memory}
            >
              <option value="16gb">16GB</option>
              <option value="32gb">32GB</option>
              <option value="64gb">64GB</option>
              <option value="128gb">128GB</option>
              <option value="256gb">256GB</option>
            </select>
          </div>
          <div className="Form-field-inline">
            <input
              type="checkbox"
              name="screencondition"
              id="screencondition"
              value={this.state.goodScreenCondition}
              onChange={this.toggleGoodScreenCondition}
            />
            <label className="Form-label" htmlFor="screencondition"><p>Screen in good condition</p></label>
          </div>
          <div className="Form-field-inline">
            <input
              type="checkbox"
              name="batterycondition"
              id="batterycondition"
              value={this.state.goodBatteryCondition}
              onChange={this.toggleGoodBatteryCondition}
            />
            <label className="Form-label" htmlFor="batterycondition"><p>Battery in good condition</p></label>
          </div>
          <div className="Form-field-inline">
            <input
              type="checkbox"
              name="bodycondition"
              id="bodycondition"
              value={this.state.goodBodyCondition}
              onChange={this.toggleGoodBodyCondition}
            />
            <label className="Form-label" htmlFor="bodycondition"><p>Body in good condition</p></label>
          </div>
          <div className="Form-submit">
            <button type="submit" onClick={this.handleSubmit}>Submit</button>
          </div>
        </form>
        { this.state.submitted &&
        <h1>Buying Price: { this.state.buyingPrice }</h1> }
      </div>
    );
  }
}

export default EvaluationForm;
