import React, { Component } from 'react';
import './Form.css';
import './DeviceForm.css';

class DeviceForm extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      model: 'iphone6',
      memory: '16gb',
    };
  }

  handleModelChange = (e) => {
    this.setState({ model: e.target.value });
  }

  handleMemoryChange = (e) => {
    this.setState({ memory: e.target.value });
  }
  
  render() {
    return (
      <div className="DeviceForm">
        <h1>Device Form</h1>
        <p>What iPhone do you want to trade for?</p>
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
              <option value="iphone6">iPhone 6</option>
              <option value="iphone6plus">iPhone 6 Plus</option>
              <option value="iphone6s">iPhone 6s</option>
              <option value="iphone6splus">iPhone 6s Plus</option>
              <option value="iphone7">iPhone 7</option>
              <option value="iphone7plus">iPhone 7 Plus</option>
              <option value="iphone8">iPhone 8</option>
              <option value="iphone8plus">iPhone 8 Plus</option>
              <option value="iphonex">iPhone X</option>
              <option value="iphonexr">iPhone XR</option>
              <option value="iphonexs">iPhone XS</option>
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
          <div className="Form-submit">
            <button type="submit" onClick={this.handleSubmit}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default DeviceForm;