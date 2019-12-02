import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCompactDisc } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

import './styles/Menu.scss';

const Menu = () =>{
  return (
    <>
      <div className="menu__container">
        <div className='menu__title'>MENU</div>
        <ul className="menu__nav">
          <NavLink exact to="/" className="menu__link" activeClassName="menu__link--active"><li><FontAwesomeIcon icon={faHome} /> Accueil</li></NavLink>
          <NavLink exact to="/me/albums" className="menu__link" activeClassName="menu__link--active"><li><FontAwesomeIcon icon={faCompactDisc} /> Mes albums</li></NavLink>
        </ul>
      </div>
      <div className="menu_mobile__container">
        <ul className="menu_mobile__nav">
          <NavLink exact to="/" className="menu_mobile__link" activeClassName="menu_mobile__link--active"><li><FontAwesomeIcon icon={faHome} /></li></NavLink>
          <NavLink to="/me/albums" className="menu_mobile__link" activeClassName="menu_mobile__link--active"><li><FontAwesomeIcon icon={faCompactDisc} /></li></NavLink>
        </ul>
      </div>
    </>
  )
}

export default Menu
