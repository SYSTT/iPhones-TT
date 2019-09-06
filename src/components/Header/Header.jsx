import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

import Menu from './../Menu/Menu';

import icon from './TnTMobileDeliveryfinal.png';

function Header() {
    return (
        <header className="Header">
            <Link to="/">
                <img className="Logo" src={icon} alt="TnT Mobile Delivery" />
            </Link>
            <Menu />
        </header>
    );
}

export default Header;