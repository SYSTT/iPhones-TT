import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

import Menu from './../Menu/Menu';

function Header() {
    return (
        <header className="Header">
            <Link to="/"><h3 className="Logo">iPhones TT</h3></Link>
            <Menu />
        </header>
    );
}

export default Header;
