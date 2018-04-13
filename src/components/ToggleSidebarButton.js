import React from 'react';

const ToggleSidebarButton = ({ toggler, isToggle, color }) => {

    function handleState() {
        toggler();
    }

    return (
        <button className={`hamburger hamburger--spin ${isToggle ? '' : 'is-active'} ${color ? 'btn-dark-color' : 'btn-light-color'}`}
            onClick={handleState}
            type="button">
            <span className="hamburger-box">
                <span className="hamburger-inner"></span>
            </span>
        </button>
    )
}

export default ToggleSidebarButton;