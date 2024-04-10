import React from 'react';
import cl from "../List/List.module.css";
import Chat from "../Chat/Chat";
import {useLeftPanelStore} from "../../store/LeftPanelStore";

const Chats = () => {

    const contentItems = useLeftPanelStore(state => state.contentItems)

    return (
        <ul className={cl.chats}>
            {contentItems.map((chat, pos) =>
                <Chat chat={chat} key={pos}/>
            )}
        </ul>
    );
};

export default Chats;