import React from 'react';
import cl from './Setting.module.css'

const Setting = ({name, text, handler}) => {
    return (
        <div className={cl.setting} onClick={() => handler()}>
            <svg className="setting_icon">
                <use href={`sprite.svg#${name}`}></use>
            </svg>
            <span>{text}</span>
        </div>
    );
};

export default Setting;