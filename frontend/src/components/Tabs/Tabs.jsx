import React from 'react';
import Tab from "../Tab/Tab";
import cl from './Tabs.module.css'
const Tabs = () => {
    return (
        <div className={cl.tabs}>
            <Tab name={'Messages'}/>
            <Tab name={'Contacts'}/>
        </div>
    );
};

export default Tabs;