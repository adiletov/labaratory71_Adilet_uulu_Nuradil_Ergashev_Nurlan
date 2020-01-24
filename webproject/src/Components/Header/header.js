import React from 'react';
import {NavLink} from "react-router-dom";
import './header.css';
const Header = () => {
    return (
        <header className="header">
            <h3>Dishes</h3>
            <NavLink to="/dishes">Блюда</NavLink>
            <NavLink to="/orders">Заказы</NavLink>
        </header>
    );
};

export default Header;