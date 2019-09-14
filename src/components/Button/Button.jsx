import React from 'react';
import './Button.css';

function Button({ text, onClick, color, backgroundColor, fitted, marginRight, disabled }) {
    let className = "Button";
    if (fitted) { className += " Button-fitted"; }
    return (
        <input
            type="button"
            className={className}
            onClick={onClick}
            value={text}
            style={{ color, backgroundColor, marginRight: marginRight ? '1em' : null }}
            disabled={disabled}
        />
    );
}

export default Button;
