import React, {useState} from 'react';
import cl from './Chat.module.css'

const Chat = ({chat}) => {
    const root = [cl.chat]
    const [active, setActive] = useState(false)

    if (active)
        root.push(cl.active)

    return (
        <li className={root.join(' ')} onClick={() => {
            setActive(true)
        }}>
            <img className={cl.avatar} src={chat.avatar}/>
            <div className={cl.textInfo}>
                <span className={cl.name}>{chat.name}</span>
                <span className={cl.lastMessage}>{chat.last_message.text}</span>
            </div>
        </li>
    );
};

export default Chat;