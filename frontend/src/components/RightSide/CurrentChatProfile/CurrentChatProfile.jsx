import React from 'react';
import cl from './CurrentChatProfile.module.css'
import {useModalStore} from "../../../store/ModalStore";
import {useRightPanelStore} from "../../../store/RightPanelStore";
import {useCurrentContactStore} from "../../../store/CurrentContactStore";
import {useCurrentChatStore} from "../../../store/CurrentChatStore";

const CurrentChatProfile = ({chat}) => {

    const setActivePanel = useRightPanelStore(state => state.setActive)
    const nullifyChat = useCurrentChatStore(state => state.nullifyChat)
    const setCurrentContact = useCurrentContactStore(state => state.setContact)

    return (
        <div className={cl.chat}>
            <img className={cl.avatar} src={chat.avatar} onClick={() => {
                setActivePanel('Contact')
                nullifyChat()
                // todo: Make request for contact of this chat
                // setCurrentContact(contact)
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