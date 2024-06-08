import React, {useEffect, useRef} from 'react';
import CurrentChatProfile from "../CurrentChatProfile/CurrentChatProfile";
import Messages from "../Messages/Messages";
import InputMessage from "../InputMessage/InputMessage";
import {useCurrentChatStore} from "../../../store/CurrentChatStore";
import {useParams} from "react-router-dom";
import cl from './SelectedChat.module.css'
import {useMessagesStore} from "../../../store/MessagesStore";
import FoundMessage from "../../FoundMessage/FoundMessage";
import DialogDnD from "../../DialogDnD/DialogDnD";

const SelectedChat = () => {

    const {chatId} = useParams()
    const currentChat = useCurrentChatStore(state => state.chat)
    const loading = useCurrentChatStore(state => state.loading)
    const fetchChatById = useCurrentChatStore(state => state.getChatById)
    const foundMessages = useMessagesStore(state => state.foundMessages)
    const dialog = useRef(null)

    useEffect(() => {
        fetchChatById(chatId)
    }, [chatId]);

    if (loading)
        return <span>LOADING</span>
    return (
        <div className={`${cl.rightPanel} right-side ${cl.activeMobile}`}>
            <CurrentChatProfile chat={currentChat}/>
            {foundMessages.length !== 0 &&
                <div className={'foundMessages'}>
                    {foundMessages.map((message) => {
                        return <FoundMessage message={message}/>
                    })}
                </div>
            }
            <Messages dialog={dialog}/>
            <InputMessage dialog={dialog}/>
            <DialogDnD dialog={dialog}/>
        </div>
    );
};

export default SelectedChat;