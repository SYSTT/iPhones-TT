import React from 'react';
import { Link } from 'react-router-dom';
import './IPhoneCard.css';

import IPhone from './IPhone.svg';

function IPhoneCard({ title, description, color, buttonText, buttonColor, link }) {
    return (
        <div className="IPhoneCard" style={{ backgroundColor: color }}>
            <h3 className="IPhoneCard-title">{ title }</h3>
            <div className="IPhoneCard-split">
                <div className="IPhoneCard-content">
                    <div className="IPhoneCard-description">{ description }</div>
                    { link &&
                    <Link to={link} className="IPhoneCard-button" style={{ backgroundColor: buttonColor }}>{ buttonText }</Link>
                    }
                </div>
                <img src={IPhone} alt="iPhone" />
            </div>
        </div>
    );
}

export default IPhoneCard;
