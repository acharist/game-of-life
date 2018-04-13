import React from 'react';

const MenuButton = ({ label, className }) => {
    return(
        <li>
            <button className={className}>{label}</button>
        </li>
    )
}

export default MenuButton;