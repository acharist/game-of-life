import React from 'react';

import Menu from './Menu';
import Title from './Title';
import ToggleSidebarButton from './ToggleSidebarButton';

const Sidebar = ({ toggler, isToggle, btns }) => {

    function handleState() {
        toggler();
    }

    function isClicked() {
		if(isToggle === 'hidden') {
            return '';
        } else if(isToggle === true) {
            return 'slide-left';
        } else {
            return 'slide-right';
        }
	}

    return (
        <div className={`sidebar ${isClicked()}`}>
            <ToggleSidebarButton toggler={handleState} isToggle={isToggle} />
            <div className="sidebar-container">
                <Title name={'Game of life'} className={'title'} />
                <Menu btns={btns} />
                <p className="project-info">Made with <span>React</span> by Amallanc</p>
            </div>
        </div>
    )

}

export default Sidebar;