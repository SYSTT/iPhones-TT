import React from 'react';
import './ContactForm.css';

function ContactForm({ contactInfo, setContactInfo }) {
  const onChange = (key, value) => {
    setContactInfo({
      ...contactInfo,
      [key]: value, 
    });
  }

  const { name, email, tel, address } = contactInfo;

  return (
    <form className="ContactForm">
      <div className="Form-fieldset">
        <div className="Form-field">
            <label className="Form-label" htmlFor="name"><p>Name:</p></label>
            <input
            name="name"
            id="name"
            type="text"
            onChange={e => onChange('name', e.target.value)}
            value={name}
            />
        </div>
        <div className="Form-field">
            <label className="Form-label" htmlFor="email"><p>Email Address:</p></label>
            <input
            name="email"
            id="email"
            type="email"
            onChange={e => onChange('email', e.target.value)}
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
            onChange={e => onChange('tel', e.target.value)}
            value={tel}
          />
        </div>
        <div className="Form-field">
          <label className="Form-label" htmlFor="address"><p>Address:</p></label>
          <input
            name="address"
            id="address"
            type="text"
            onChange={e => onChange('address', e.target.value)}
            value={address}
          />
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
