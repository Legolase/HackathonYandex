import React from 'react';
import cl from './Setting.module.css'

const Setting = ({ text, handler, icon}) => {
    return (
        <div className={cl.setting} onClick={() => handler()}>
            {icon}
            <span>{text}</span>
        </div>
    );
};

export default Setting;