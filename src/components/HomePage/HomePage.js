import React from 'react';
import './HomePage.css';

import IPhoneCard from '../IPhoneCard/IPhoneCard';

const Cards = [{
    title: 'Buy iPhones',
    description: 'View our stock of iPhones and prices.',
    buttonText: 'Shop iPhones',
    color: '#7C2929',
    buttonColor: '#301717',
    link: '/buy',
}, {
    title: 'Estimate your iPhone’s Value',
    description: 'Use our estimation tool to find the value of your old iPhone.',
    buttonText: 'Get Started',
    color: '#29687C',
    buttonColor: '#172A30',
    link: '/estimate',
}];

function HomePage() {
    return (
        <div className="HomePage">
            <h4 className="HomePage-welcome">Welcome to iPhones TT</h4>
            <div className="HomePage-links">
                { Cards.map(card => (
                    <IPhoneCard key={card.title} {...card} />
                ))}
            </div>
        </div>
    );
}

export default HomePage;