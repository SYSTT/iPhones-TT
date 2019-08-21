import React, { Component } from 'react';
import './Form.css';
import './EvaluationForm.css';

class EvaluationForm extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      model: 'iphone6s',
      memory: '16gb',
      colour: 'spacegrey',
      carrier: 'unlocked',
      iCloudUnlocked: false,
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

  handleColourChange = (e) => {
    this.setState({ colour: e.target.value });
  }

  handleCarrierChange = (e) => {
    this.setState({ carrier: e.target.value });
  }

  toggleGoodBatteryCondition = (e) => {
    this.setState({ goodBatteryCondition: e.target.checked });
  }

  toggleGoodBodyCondition = (e) => {
    this.setState({ goodBodyCondition: e.target.checked });
  }

  toggleICloudUnlocked = (e) => {
    this.setState({ iCloudUnlocked: e.target.checked });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      model,
      memory,
      iCloudUnlocked,
      goodBatteryCondition,
      goodBodyCondition
    } = this.state;

    if (!iCloudUnlocked) {
      alert('We cannot provide an estimate for iPhones with locked iCloud.')
      return;
    }
    if (!goodBatteryCondition) {
      alert('We can only provide estimates for iPhones battery health over 85% right now.')
      return;
    }
    if (!goodBodyCondition) {
      alert('We can only provide estimates for iPhones in grade A condition right now.')
      return;
    }

    this.setState({
      buyingPrice: this.props.priceTable[model].prices[memory],
      submitted: true,
    }, () => {
      this.props.handleSubmit(this.state);
    });
  }
  
  render() {
    return (
      <div className="EvaluationForm">
        <h1>Estimation Tool</h1>
        <p>Submit some information on the iPhone model that you want to estimate the value of.</p>
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
          <div className="Form-field">
            <label className="Form-label" htmlFor="colour"><p>Colour:</p></label>
            <select
              name="colour"
              id="colour"
              onChange={this.handleColourChange}
              value={this.state.colour}
            >
              <option value="spacegrey">Space Grey</option>
              <option value="silver">Silver</option>
              <option value="gold">Gold</option>
              <option value="rosegold">Rose Gold</option>
              <option value="jetblack">Jet Black</option>
              <option value="black">Black</option>
              <option value="productred">Product Red</option>
              <option value="red">Red</option>
              <option value="yellow">Yellow</option>
              <option value="blue">Blue</option>
              <option value="coral">Coral</option>
              <option value="white">White</option>
            </select>
          </div>
          <div className="Form-field">
            <label className="Form-label" htmlFor="carrier"><p>Carrier:</p></label>
            <select
              name="carrier"
              id="carrier"
              onChange={this.handleCarrierChange}
              value={this.state.carrier}
            >
              <option value="unlocked">Unlocked</option>
              <option value="bmobile">Bmobile</option>
              <option value="digicel">Digicel</option>
            </select>
          </div>
          <div className="Form-field-inline checkbox">
            <input
              type="checkbox"
              name="icloud"
              id="icloud"
              value={this.state.iCloudUnlocked}
              onChange={this.toggleICloudUnlocked}
            />
            <label className="Form-label" htmlFor="icloud">iCloud is not locked</label>
          </div>
          <div className="Form-field-inline checkbox">
            <input
              type="checkbox"
              name="bodycondition"
              id="bodycondition"
              value={this.state.goodBodyCondition}
              onChange={this.toggleGoodBodyCondition}
            />
            <label className="Form-label" htmlFor="bodycondition">No issues (hardware or software), dents, marks, scuffs or scratches on your iPhone</label>
          </div>
          <div className="Form-field-inline checkbox">
            <input
              type="checkbox"
              name="batterycondition"
              id="batterycondition"
              value={this.state.goodBatteryCondition}
              onChange={this.toggleGoodBatteryCondition}
            />
            <label className="Form-label" htmlFor="batterycondition">Battery health is above 85%</label>
          </div>
          <div className="Form-submit">
            <button type="submit" onClick={this.handleSubmit}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default EvaluationForm;
