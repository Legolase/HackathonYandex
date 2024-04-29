import React from 'react';
import cl from './Chat.module.css'
import {useCurrentChatStore} from "../../../store/CurrentChatStore";
import {useCurrentContactStore} from "../../../store/CurrentContactStore";
import {useNavigate} from "react-router";

const Chat = ({chat}) => {

    const root = [cl.chat]
    const currentChat = useCurrentChatStore(state => state.chat)
    const fetchChat = useCurrentChatStore(state => state.fetchChatById)
    const setChat = useCurrentChatStore(state => state.setChat)
    const nullifyContact = useCurrentContactStore(state => state.nullifyContact)
    const router = useNavigate()

    if (currentChat && currentChat.id === chat.id)
        root.push(cl.active)

    return (
        <li className={root.join(' ')} onClick={() => {
            setChat(chat)
            fetchChat(chat.id)
            nullifyContact()
            router(`/chat/${chat.id}`)
        }}>
            <img className={cl.avatar} src={chat.avatar} alt={'?'}/>
            <div className={cl.textInfo}>
                <span className={cl.name}>{chat.name}</span>
                {/*<span className={cl.lastMessage}>{chat.last_message.text}</span>*/}
            </div>
        </li>
    );
};

export default Chat;