import React from 'react';
import cl from './Tab.module.css'

const Tab = ({name}) => {
    return (
        <div>
            <span className={cl.tab}>{name}</span>
        </div>
    );
};

export default Tab;