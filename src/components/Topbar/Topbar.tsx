import React from 'react';
import { Link } from 'react-router-dom';
import './Topbar.css';

import Menu from '../Menu/Menu';

import icon from './TnTMobileDeliveryfinal.png';

const Topbar: React.FC = () => {
  return (
    <header className="Header">
      <Link to="/">
        <img className="Logo" src={icon} alt="TnT Mobile Delivery" />
      </Link>
      <Menu />
    </header>
  );
};

export default Topbar;
