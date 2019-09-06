import React from 'react';
import './Switch.css';

function SwitchOption({ option, selected, onSwitch }) {
    let className = "SwitchOption";
    if (option === selected) { className += " SwitchOption-selected" }
    return (
        <div className={className} onClick={() => onSwitch(option)}>
            <h3>{ option }</h3>
        </div>
    );
}

function Switch({ option1, option2, selected, onSwitch }) {
    return (
        <div className="Switch">
            <SwitchOption option={option1} selected={selected} onSwitch={onSwitch} />
            <SwitchOption option={option2} selected={selected} onSwitch={onSwitch} />
        </div>
    );
}

export default Switch;
