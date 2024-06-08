import React, {useEffect, useState} from 'react';
import cl from './Messages.module.css'
import Message from "../Message/Message";
import {useMessagesStore} from "../../../store/MessagesStore";
import {useLoggedInUserStore} from "../../../store/LoggedInUserStore";
import {useCurrentChatStore} from "../../../store/CurrentChatStore";
import DnD from "../../DnD/DnD";
import {useFilesStore} from "../../../store/FilesStore";
import {PhotoProvider} from "react-photo-view";
import {useSocketStore} from "../../../store/SocketStore";

const Messages = ({dialog}) => {

    const messages = useMessagesStore(state => state.messages)
    const addMessage = useMessagesStore(state => state.addMessage)
    const loggedInUser = useLoggedInUserStore(state => state.currentUser)
    const getMessagesByChatId = useMessagesStore(state => state.getMessagesByChatId)
    const chatId = useCurrentChatStore(state => state.chat.id)
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


    useEffect(() => {
        groupByDateMessages()
    }, [messages]);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            if (data.chat_id === chatId) {
                addMessage(data)
                groupByDateMessages()
            }
            socket.emit('NOTIFY_ALL', data)
        });
        return () => {
            socket.off("receive_message");
        };
    }, []);

    useEffect(() => {
        getMessagesByChatId(chatId)
        groupByDateMessages()
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
                        <>
                            {grouped[key].map((message, pos) => {
                                return <Message key={pos} message={message} my={message.user_id === loggedInUser.id}/>
                            })}
                            <h4 style={{textAlign: 'center'}}>{key}</h4>
                        </>
                    ))

                }
            </PhotoProvider>
            <DnD dialog={dialog}/>
        </div>
    )
        ;
};

export default Messages;