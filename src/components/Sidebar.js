import React from 'react';

import Menu from './Menu';
import Title from './Title';
import ToggleSidebarButton from './ToggleSidebarButton';

const Sidebar = ({ toggle, isToggle, playBtn, pauseBtn, clearBtn, slowBtn, fastBtn, seedBtn, sizeBtn, btns }) => {

    function handleState() {
        toggle();
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
            <ToggleSidebarButton toggle={handleState} isToggle={isToggle} />
            <div className="sidebar-container">
                <Title name={'Game of life'} className={'title'} />
                <Menu
                    playBtn={playBtn}
                    pauseBtn={pauseBtn}
                    clearBtn={clearBtn}
                    slowBtn={slowBtn}
                    fastBtn={fastBtn}
                    seedBtn={seedBtn}
                    sizeBtn={sizeBtn}
                    btns={btns}/>
                <p className="project-info">Made with <span>React</span> by Amallanc</p>
            </div>
        </div>
    )

}

export default Sidebar;