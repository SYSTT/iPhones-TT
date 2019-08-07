import React, { useState } from 'react';
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
}];

function Menu() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <div className="Menu">
            { menuOpen &&
            <div className="Menu-mobile">
                { MenuOptions.map(option => (
                <h3
                    className="Menu-mobile-item"
                    key={option.text}
                    style={{ color: option.color }}
                >
                    { option.text }
                </h3>
                ))}
            </div>
            }
            <img
                className="Menu-button"
                onClick={() => setMenuOpen(!menuOpen)}
                src={!menuOpen ? MenuButton : CloseMenuButton}
                alt="Menu"
            />
            <div className="Menu-desktop">
                { MenuOptions.map(option => (
                <h3
                    className="Menu-mobile-item"
                    key={option.text}
                    style={{ color: option.color }}
                >
                    { option.text }
                </h3>
                ))}
            </div>
        </div>
    );
}

export default Menu;
