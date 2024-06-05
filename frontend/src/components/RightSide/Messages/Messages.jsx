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
    const [grouped, setGrouped] = useState({})
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const groupByDateMessages = () => {
        const grouped = {}
        for (const message of messages) {
            const date = new Date(message.datetime);
            const day = date.getDate();
            const month = months[date.getMonth()];
            const finalDate = `${day} ${month}`
            if (finalDate in grouped)
                grouped[finalDate].push(message)
            else
                grouped[finalDate] = [message]
        }
        setGrouped(grouped)
    }

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView()
    }

    useEffect(() => {
        groupByDateMessages()
        scrollToBottom()
    }, [messages]);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            if (data.chat_id === chatId) {
                addMessage(data)
                groupByDateMessages()
            }
        });
        scrollToBottom();
        return () => {
            socket.off("receive_message");
        };
    }, []);

    useEffect(() => {
        getMessagesByChatId(chatId)
        groupByDateMessages()
        scrollToBottom();
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
                {
                    Object.keys(grouped).map((key) => (
                        <div className={cl.grouped}>
                            <h4 style={{textAlign: 'center', color: 'var(--light-gray)'}}>{key}</h4>
                            {grouped[key].map((message, pos) => {
                                return <Message key={pos} message={message} my={message.user_id === loggedInUser.id}/>
                            })}
                        </div>
                    ))

                }
            </PhotoProvider>
            <div style={{height: '3px', backgroundColor: 'red'}} ref={messagesEndRef}></div>

            <DnD dialog={dialog}/>
            <DialogDnD dialog={dialog}/>
        </div>
    )
        ;
};

export default Messages;