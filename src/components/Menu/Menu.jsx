import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

import MenuButton from './MenuButton.svg';
import CloseMenuButton from './CloseMenuButton.svg';
import { Colors } from '../../utils';
import { useAuth } from '../../modules/auth';

const MenuOptions = [
  {
    text: 'Buy',
    link: '/buy/',
    color: Colors.Primary,
  },
  {
    text: 'Trade',
    link: '/trade/',
    color: Colors.Primary,
  },
  {
    text: 'Your Cart',
    link: '/cart/',
    color: Colors['Grey/VeryDark'],
  },
  {
    text: 'About',
    link: '/about/',
    color: Colors['Grey/VeryDark'],
  },
  {
    text: 'Login',
    link: '/login/',
    color: Colors['Grey/VeryDark'],
  },
  {
    text: 'Logout',
    link: '/logout/',
    color: Colors['Grey/VeryDark'],
  },
];

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { loggedIn } = useAuth();

  const MenuLinks = MenuOptions.filter(
    option =>
      (option.text !== 'Login' || !loggedIn) &&
      (option.text !== 'Logout' || loggedIn),
  ).map(option => (
    <Link to={option.link} key={option.text} onClick={() => setMenuOpen(false)}>
      <h3 className="Menu-item" style={{ color: option.color }}>
        {option.text}
      </h3>
    </Link>
  ));

  return (
    <div className="Menu">
      {menuOpen && <div className="Menu-mobile">{MenuLinks}</div>}
      <img
        className="Menu-button"
        onClick={() => setMenuOpen(!menuOpen)}
        src={!menuOpen ? MenuButton : CloseMenuButton}
        alt="Menu"
      />
      <div className="Menu-desktop">{MenuLinks}</div>
    </div>
  );
};

export default Menu;
