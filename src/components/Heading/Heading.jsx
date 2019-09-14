import React from 'react';
import './Heading.css';

import Title from './../Title/Title';

function Heading({ title, text }) {
    return (
        <div className="Heading">
            <Title>{ title }</Title>
            { text && <p>{ text }</p> }
        </div>
    );
}

export default Heading;
