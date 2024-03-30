import React from 'react';
import Chat from "../Chat/Chat";
import cl from './Chats.module.css'

const Chats = ({chats}) => {
    return (
        <ul className={cl.chats}>
            {chats.map(chat =>
                <Chat chat={chat}/>
            )}
        </ul>
    );
};

export default Chats;