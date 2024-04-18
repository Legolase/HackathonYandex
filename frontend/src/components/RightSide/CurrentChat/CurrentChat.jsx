import React from 'react';
import cl from './CurrentChat.module.css'
import {useModalStore} from "../../../store/ModalStore";
const CurrentChat = ({chats}) => {

    const setActive = useModalStore(state => state.setActive)

    return (
        <div className={cl.chat}>
            <img className={cl.avatar} src={chats[0].avatar} onClick={() => setActive(true)}/>
            <div className={cl.textInfo}>
                <span className={cl.name}>{chats[0].name}</span>
                <span className={cl.lastMessage}></span>
            </div>
        </div>
    );
};

export default CurrentChat;