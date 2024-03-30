import React from 'react';
import Profile from "../Profile/Profile";
import Tabs from "../Tabs/Tabs";
import Search from "../Search/Search";
import Chats from "../Chats/Chats";
import cl from './LeftPanel.module.css'

const LeftPanel = ({chats}) => {
    return (
        <div className={cl.leftPanel}>
            <Profile/>
            <Tabs/>
            <Search/>
            <Chats chats={chats}/>
        </div>
    );
};

export default LeftPanel;