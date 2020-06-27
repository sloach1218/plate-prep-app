import React from 'react';
import './Header.css';
import logo from '../../images/pp_icon_solid.png';

function Header() {
  return (
    <header>
      <img src={logo} className="logo" alt="logo icon"/>
      <h1>Plate Prep</h1>
    </header>
  )
}

export default Header;