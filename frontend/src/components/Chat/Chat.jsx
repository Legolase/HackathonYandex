import React from 'react';
import cl from './Chat.module.css'

const Chat = ({chat}) => {
    console.log(chat)
    return (
        <li className={cl.chat}>
            <img className={cl.avatar} src={chat.avatar}/>
            <div className={cl.textInfo}>
                <span className={cl.name}>{chat.name}</span>
                <span className={cl.lastMessage}>{chat.last_message.text}</span>
            </div>
        </li>
    );
};

export default Chat;