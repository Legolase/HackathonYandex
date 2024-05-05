import React, {useEffect, useState} from 'react';
import CurrentChatProfile from "../CurrentChatProfile/CurrentChatProfile";
import Messages from "../Messages/Messages";
import InputMessage from "../InputMessage/InputMessage";
import {useCurrentChatStore} from "../../../store/CurrentChatStore";
import chat from "../../LeftSide/Chat/Chat";
import {useParams} from "react-router-dom";

const SelectedChat = () => {

    const {chatId} = useParams()
    const currentChat = useCurrentChatStore(state => state.chat)
    const loading = useCurrentChatStore(state => state.loading)
    const fetchChatById = useCurrentChatStore(state => state.fetchChatById)

    useEffect(() => {
        fetchChatById(chatId)
    }, [chatId]);


    if (loading)
        return <span>LOADING</span>
    return (
        <div className={'right-panel'} style={{width: '100%', display: "flex", flexDirection: 'column', gap: '3px'}}>
            <CurrentChatProfile chat={currentChat}/>
            <Messages/>
            <InputMessage/>
        </div>
    );
};

export default SelectedChat;