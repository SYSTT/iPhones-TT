import React from 'react';
import './HomePage.css';

import IPhoneCard from '../IPhoneCard/IPhoneCard';
import ReviewSection from '../ReviewSection/ReviewSection';

const Cards = [{
    title: 'Buy iPhones',
    description: 'View our iPhones and prices.',
    buttonText: 'Shop iPhones',
    color: '#7C2929',
    buttonColor: '#301717',
    link: '/buy',
}, {
    title: 'Get your iPhone’s Value',
    description: 'Find out how much your iPhone is worth in seconds.',
    buttonText: 'Get Started',
    color: '#29687C',
    buttonColor: '#172A30',
    link: '/estimate',
}];

function HomePage() {
    return (
        <div className="HomePage">
            <h4 className="HomePage-welcome">Welcome to T&T Mobile Delivery</h4>
            <div className="HomePage-links">
                { Cards.map(card => (
                    <IPhoneCard key={card.title} {...card} />
                ))}
            </div>
            <ReviewSection />
        </div>
    );
}

export default HomePage;