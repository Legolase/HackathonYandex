import React from 'react';
import cl from './Button.module.css'

const Button = ({name, onClickHandler}) => {
    return (
        <button className={cl.button} onClick={(event) => {
            event.preventDefault()
            onClickHandler()
        }}>
            {name}
        </button>
    );
};

export default Button;