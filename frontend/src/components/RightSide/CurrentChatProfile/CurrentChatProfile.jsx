import React from 'react';
import cl from './CurrentChatProfile.module.css'
import {useCurrentChatStore} from "../../../store/CurrentChatStore";

const CurrentChatProfile = ({chat}) => {

    const nullifyChat = useCurrentChatStore(state => state.nullifyChat)
    const getDataByChat = useCurrentChatStore(state => state.getDataByChat)
    const data = getDataByChat(chat)

    console.log(data)

    return (
        <div className={cl.chat}>
            <img className={cl.avatar} src={data.avatar} onClick={() => {
                nullifyChat()
                // todo: Make request for contact of this chat
            }}/>
            <div className={cl.textInfo}>
                <span className={cl.name}>{data.name}</span>
                {/*todo: Line below for last seen*/}
                <span className={cl.lastMessage}></span>
            </div>
        </div>
    );
};

export default CurrentChatProfile;