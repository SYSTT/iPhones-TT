import React, { useState } from 'react';
import './ContactForm.css';

function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [address, setAddress] = useState('');

    return (
        <div className="ContactForm">
        <h1>Place Your Order Here</h1>
        <p>Fill your information in below and we’ll call you within the hour to confirm your order.</p>
        <br/>
        <form>
          <div className="Form-fieldset">
            <div className="Form-field">
                <label className="Form-label" htmlFor="name"><p>Name:</p></label>
                <input
                name="name"
                id="name"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                />
            </div>
            <div className="Form-field">
                <label className="Form-label" htmlFor="email"><p>Email Address:</p></label>
                <input
                name="email"
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                />
            </div>
          </div>
          <div className="Form-fieldset">
            <div className="Form-field">
              <label className="Form-label" htmlFor="tel"><p>Phone Number:</p></label>
              <input
                name="tel"
                id="tel"
                type="tel"
                onChange={(e) => setTel(e.target.value)}
                value={tel}
              />
            </div>
            <div className="Form-field">
              <label className="Form-label" htmlFor="address"><p>Address:</p></label>
              <input
                name="address"
                id="address"
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
              />
            </div>
          </div>
          <div className="Form-submit">
            <button type="submit" onClick={() => {}}>Submit</button>
          </div>
        </form>
      </div>
    );
};

export default ContactForm;
