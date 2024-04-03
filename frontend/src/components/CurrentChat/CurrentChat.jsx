import React from 'react';
import cl from './CurrentChat.module.css'
const CurrentChat = ({chats}) => {
    return (
        <div className={cl.chat}>
            <img className={cl.avatar} src={chats[0].avatar}/>
            <div className={cl.textInfo}>
                <span className={cl.name}>{chats[0].name}</span>
                <span className={cl.lastMessage}></span>
            </div>
        </div>
    );
};

export default CurrentChat;