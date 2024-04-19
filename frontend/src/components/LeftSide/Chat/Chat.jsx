import React, {useState} from 'react';
import cl from './Chat.module.css'
import {useRightPanelStore} from "../../../store/RightPanelStore";
import {useCurrentChatStore} from "../../../store/CurrentChatStore";
import {useCurrentContactStore} from "../../../store/CurrentContactStore";

const Chat = ({chat}) => {
    const root = [cl.chat]
    const [active, setActive] = useState(false)
    const setActivePanel = useRightPanelStore(state => state.setActive)
    // todo:  Тут нужен Илья, ибо мне надо понять, что он мне возвращает, и что мне надо получить от него
    const setCurrentChat = useCurrentChatStore(state => state.fetchChat)
    const nullifyContact = useCurrentContactStore(state => state.nullifyContact)


    if (active)
        root.push(cl.active)

    return (
        <li className={root.join(' ')} onClick={() => {
            setActive(true)
            setActivePanel('Chat')
            nullifyContact()
        }}>
            <img className={cl.avatar} src={chat.avatar} alt={'?'}/>
            <div className={cl.textInfo}>
                <span className={cl.name}>{chat.name}</span>
                <span className={cl.lastMessage}>{chat.last_message.text}</span>
            </div>
        </li>
    );
};

export default Chat;