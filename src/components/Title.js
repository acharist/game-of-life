import React from 'react';

const Title = ({ name, className }) => {
    return(
        <h1 className={className}>{name}</h1>
    )
}

export default Title;