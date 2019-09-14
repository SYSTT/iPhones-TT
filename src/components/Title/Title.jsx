import React from 'react';
import './Title.css';

function Title({ children }) {
    return (
        <div className="Title">
            <h1>{ children }</h1>
            <div className="Title-underline" />
        </div>
    );
}

export default Title;
