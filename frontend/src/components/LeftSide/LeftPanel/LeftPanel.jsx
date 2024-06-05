import React from 'react';
import Search from "../Search/Search";
import List from "../List/List";
import cl from './LeftPanel.module.css'
import {useNavStore} from "../../../store/NavStore";

const LeftPanel = () => {

    const active = useNavStore(state => state.active)

    function currentActive() {
        if (active === 'allChats')
            return <span className={cl.active}>Chats</span>
        else
            return <span className={cl.active}>Contacts</span>
    }

    return (
        <div className={cl.leftPanel}>
            {currentActive()}
            <Search/>
            <List/>
        </div>
    );
};

export default LeftPanel;