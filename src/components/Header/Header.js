import React from 'react';
import './Header.css';

import Menu from './../Menu/Menu';

function Header() {
    return (
        <header className="Header">
            <h3 className="Logo">iPhones TT</h3>
            <Menu />
        </header>
    );
}

export default Header;
