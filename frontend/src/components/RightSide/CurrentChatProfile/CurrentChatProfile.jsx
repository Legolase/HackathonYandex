import React from 'react';
import cl from './CurrentChatProfile.module.css'
import {useCurrentChatStore} from "../../../store/CurrentChatStore";

const CurrentChatProfile = ({chat}) => {

    const nullifyChat = useCurrentChatStore(state => state.nullifyChat)

    console.log(chat)

    return (
        <div className={cl.chat}>
            <img className={cl.avatar} src={chat.avatar} onClick={() => {
                nullifyChat()
                // todo: Make request for contact of this chat
            }}/>
            <div className={cl.textInfo}>
                <span className={cl.name}>{chat.name}</span>
                {/*todo: Line below for last seen*/}
                <span className={cl.lastMessage}></span>
            </div>
        </div>
    );
};

export default CurrentChatProfile;