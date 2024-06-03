import React, {useEffect, useRef, useState} from 'react';
import cl from './Messages.module.css'
import Message from "../Message/Message";
import {useMessagesStore} from "../../../store/MessagesStore";
import {useLoggedInUserStore} from "../../../store/LoggedInUserStore";
import {useCurrentChatStore} from "../../../store/CurrentChatStore";
import DnD from "../../DnD/DnD";
import DialogDnD from "../../DialogDnD/DialogDnD";
import {useFilesStore} from "../../../store/FilesStore";
import {PhotoProvider} from "react-photo-view";
import {useSocketStore} from "../../../store/SocketStore";

const Messages = () => {

    const messages = useMessagesStore(state => state.messages)
    const addMessage = useMessagesStore(state => state.addMessage)
    const messagesEndRef = useRef(null)
    const loggedInUser = useLoggedInUserStore(state => state.currentUser)
    const getMessagesByChatId = useMessagesStore(state => state.getMessagesByChatId)
    const chatId = useCurrentChatStore(state => state.chat.id)
    const dialog = useRef(null)
    const setActive = useFilesStore(state => state.setActiveBackground)
    const socket = useSocketStore(state => state.socket)

    console.log(chatId)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView()
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            if (data.chat_id === chatId)
                addMessage(data)
        });
        scrollToBottom();
        return () => {
            socket.off("receive_message");
        };
    }, [messages]);

    useEffect(() => {
        getMessagesByChatId(chatId)
        scrollToBottom();
        // scrollToBottom()
        // const intervalId = setInterval(() => {
        // }, 1500)
        // return () => {
        //     clearInterval(intervalId)
        // }
    }, []);


    const dragOver = (e) => {
        e.preventDefault()
        setActive(true)
    }

    return (
        <div className={cl.messages}
             onDragOver={e => dragOver(e)}
        >
            <PhotoProvider>
                {messages.map((message, pos) => {
                        return <Message key={pos} message={message} my={message.user_id === loggedInUser.id}/>
                    }
                )}
            </PhotoProvider>
            <div ref={messagesEndRef}></div>
            <DnD dialog={dialog}/>
            <DialogDnD dialog={dialog}/>
        </div>
    );
};

export default Messages;