import React from 'react';

const Box = ({ boxClass, row, col, selectBox, width, height }) => {
    function handleClick() {
        selectBox(row, col);    
    }

    return (
        <div 
            className={boxClass} 
            style={{width: width, height: height}}
            onClick={handleClick}
        >
        </div>
    )
}

export default Box