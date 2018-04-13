import React from 'react';
import MenuButton from './MenuButton';

const Menu = ({ btns }) => {
    return (
        <nav className="nav">
            <ul>
                {btns.map((item, index) => {
                    return (
                        <li key={index}>
                            <button className="btn">{item.label}</button>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Menu;