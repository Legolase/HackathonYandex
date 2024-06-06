import React, {useEffect} from 'react';
import CurrentChatProfile from "../CurrentChatProfile/CurrentChatProfile";
import Messages from "../Messages/Messages";
import InputMessage from "../InputMessage/InputMessage";
import {useCurrentChatStore} from "../../../store/CurrentChatStore";
import {useParams} from "react-router-dom";
import cl from './SelectedChat.module.css'
import {useMessagesStore} from "../../../store/MessagesStore";
import FoundMessage from "../../FoundMessage/FoundMessage";

const SelectedChat = () => {

    const {chatId} = useParams()
    const currentChat = useCurrentChatStore(state => state.chat)
    const loading = useCurrentChatStore(state => state.loading)
    const fetchChatById = useCurrentChatStore(state => state.getChatById)
    const foundMessages = useMessagesStore(state => state.foundMessages)

    useEffect(() => {
        fetchChatById(chatId)
    }, [chatId]);

    if (loading)
        return <span>LOADING</span>
    return (
        <div className={`${cl.rightPanel} right-side`}>
            <CurrentChatProfile chat={currentChat}/>
            {foundMessages.length !== 0 &&
                <div className={'foundMessages'}>
                    {foundMessages.map((message) => {
                        return <FoundMessage message={message}/>
                    })}
                </div>
            }
            <Messages/>
            <InputMessage/>
        </div>
    );
};

export default SelectedChat;