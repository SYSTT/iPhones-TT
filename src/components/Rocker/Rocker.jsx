import React from 'react';
import './Rocker.css';

import minus from './minus.svg';
import plus from './plus.svg';

function Rocker({ title, name, value, onChange, min, max, inputRef }) {
    const handleChange = (e) => {
        e.preventDefault();
        const newVal = e.target.value;
        if ((!min || newVal >= min) && (!max || newVal <= max)) {
            onChange(newVal);
        }
    }
    const increase = () => {
        const newVal = value + 1;
        if (!max || newVal <= max) {
            onChange(newVal);
        }
    }
    const decrease = () => {
        const newVal = value - 1;
        if (!min || newVal >= min) {
            onChange(newVal);
        }
    }

    return (
        <div className="Rocker">
            <label htmlFor={name}>{ title }</label>
            <div className="Rocker-controls">
                <button type="button" className="Rocker-control" onClick={decrease} disabled={value === min}>
                    <img src={minus} alt="Decrease" />
                </button>
                <input type="number" name={name} id={name} value={value} onChange={handleChange} ref={inputRef} />
                <button type="button" className="Rocker-control" onClick={increase} disabled={value === max}>
                    <img src={plus} alt="Increase" />
                </button>
            </div>
        </div>
    );
}

export default Rocker;
