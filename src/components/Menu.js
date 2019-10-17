import React from 'react';

const Menu = ({ playBtn, pauseBtn, clearBtn, slowBtn, fastBtn, seedBtn, sizeBtn, btns }) => {
    function handlePlay() {
        playBtn();
    }

    function handlePause() {
        pauseBtn();
    }

    function handleClear() {
        clearBtn();
    }

    function handleSlow() {
        slowBtn();
    }

    function handleFast() {
        fastBtn();
    }

    function handleSeed() {
        seedBtn();
    }

    function handleSize(event) {
        let target = event.target;
    
        if(target.hasAttribute('data-key')) {
            sizeBtn(target.getAttribute('data-key'));
        }
    }

    function mapOverData() {
        let uiArr = [];
        btns.map((item, index) => {
            if (item.hasOwnProperty('subMenu')) {
                return uiArr.push(
                    <li key={index} className="drop-down">
                        <button className="btn hover">{item.label}</button>
                        <ul onClick={handleSize}>
                            {item['subMenu'].map((innerItem, innerIndex) => {
                                return (
                                    <li key={innerIndex}>
                                        <button className="btn" data-key={innerIndex}>{innerItem.label}</button>
                                    </li>
                                )
                            })}
                        </ul>
                    </li>
                )
            } else {
                switch(item.label) {
                    case 'Play':
                        return (
                            uiArr.push(
                                <li key={index}>
                                    <button onClick={handlePlay} className="btn">{item.label}</button>
                                </li>
                            )
                        )
                    case 'Pause':
                        return (
                            uiArr.push(
                                <li key={index}>
                                    <button onClick={handlePause} className="btn">{item.label}</button>
                                </li>
                            )
                        );
                    case 'Clear':
                        return (
                            uiArr.push(
                                <li key={index}>
                                    <button onClick={handleClear} className="btn">{item.label}</button>
                                </li>
                            )
                        );
                    case 'Slow':
                        return (
                            uiArr.push(
                                <li key={index}>
                                    <button onClick={handleSlow} className="btn">{item.label}</button>
                                </li>
                            )
                        );
                    case 'Fast':
                        return (
                            uiArr.push(
                                <li key={index}>
                                    <button onClick={handleFast} className="btn">{item.label}</button>
                                </li>
                            )
                        );
                    case 'Seed':
                        return (
                            uiArr.push(
                                <li key={index}>
                                    <button onClick={handleSeed} className="btn">{item.label}</button>
                                </li>
                            )
                        );
                    default:
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