import React from 'react';
import './Button.css';

function Button({ text, onClick }) {
    return (
        <input
            type="button"
            className="Button"
            onClick={onClick}
            value={text}
        />
    );
}

export default Button;
