import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

import MenuButton from './MenuButton.svg';
import CloseMenuButton from './CloseMenuButton.svg';

const MenuOptions = [{
    text: 'Buy',
    link: '/buy',
    color: '#7C2929',
}, {
    text: 'Estimate',
    link: '/estimate',
    color: '#29687C',
}, {
    text: 'Your Cart',
    link: '/cart',
    color: 'black',
}, {
    text: 'Login',
    link: '/login',
    color: 'black',
}];

function Menu() {
    const [menuOpen, setMenuOpen] = useState(false);
    
    const MenuLinks = MenuOptions.map(option => (
        <Link to={option.link} key={option.text} onClick={() => setMenuOpen(false)}>
            <h3
                className="Menu-item"
                style={{ color: option.color }}
            >
                { option.text }
            </h3>
        </Link>
    ));

    return (
        <div className="Menu">
            { menuOpen &&
            <div className="Menu-mobile">{ MenuLinks }</div>
            }
            <img
                className="Menu-button"
                onClick={() => setMenuOpen(!menuOpen)}
                src={!menuOpen ? MenuButton : CloseMenuButton}
                alt="Menu"
            />
            <div className="Menu-desktop">{ MenuLinks }</div>
        </div>
    );
}

export default Menu;
