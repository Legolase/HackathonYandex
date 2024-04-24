import React, {useState} from 'react';
import CurrentChatProfile from "../CurrentChatProfile/CurrentChatProfile";
import Messages from "../Messages/Messages";
import InputMessage from "../InputMessage/InputMessage";
import {useCurrentChatStore} from "../../../store/CurrentChatStore";
import chat from "../../LeftSide/Chat/Chat";

const SelectedChat = () => {

    const currentChat = useCurrentChatStore(state => state.chat)
    console.log(currentChat)
    return (
        <div className={'right-panel'} style={{width: '100%', display: "flex", flexDirection: 'column', gap: '3px'}}>
            <CurrentChatProfile chat={currentChat}/>
            <Messages/>
            <InputMessage/>
        </div>
    );
};

export default SelectedChat;