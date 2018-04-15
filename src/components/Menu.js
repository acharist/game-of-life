import React from 'react';

const Menu = ({ playBtn, pauseBtn, slowBtn, fastBtn, clearBtn, btns }) => {

    function handlePlay() {

    }

    function handlePause() {

    }

    function handleSlow() {

    }

    function handleFast() {

    }

    function handleClear() {
        clearBtn();
    }

    function mapOverData() {
        let uiArr = [];
        btns.map((item, index) => {
            if (item.hasOwnProperty('subMenu')) {
                return uiArr.push(
                    <li key={index} className="drop-down">
                        <button className="btn hover">{item.label}</button>
                        <ul>
                            {item['subMenu'].map((innerItem, innerIndex) => {
                                return (
                                    <li key={innerIndex}>
                                        <button className="btn" >{innerItem.label}</button>
                                    </li>
                                )
                            })}
                        </ul>
                    </li>
                )
            } else {
                if (item.label === 'Clear') {
                    return (
                        uiArr.push(
                            <li key={index}>
                                <button onClick={handleClear} className="btn">{item.label}</button>
                            </li>
                        )
                    )
                } else {
                    return (
                        uiArr.push(
                            <li key={index}>
                                <button className="btn">{item.label}</button>
                            </li>
                        )
                    )
                }
            }
        });

        return uiArr;
    }
    return (
        <nav className="nav">
            <ul>
                {mapOverData()}
            </ul>
        </nav>
    )
}

export default Menu;