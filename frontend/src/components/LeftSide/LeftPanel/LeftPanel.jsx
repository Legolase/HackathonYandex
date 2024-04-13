import React from 'react';
import Profile from "../Profile/Profile";
import Tabs from "../Tabs/Tabs";
import Search from "../Search/Search";
import List from "../List/List";
import cl from './LeftPanel.module.css'

const LeftPanel = () => {
    return (
        <div className={cl.leftPanel}>
            <Profile/>
            <Tabs/>
            <Search/>
            <List />
        </div>
    );
};

export default LeftPanel;