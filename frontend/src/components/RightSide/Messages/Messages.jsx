import React, {useEffect, useRef} from 'react';
import cl from './Messages.module.css'
import Message from "../Message/Message";
import {useMessagesStore} from "../../../store/MessagesStore";
import {useLoggedInUserStore} from "../../../store/LoggedInUserStore";
import {useCurrentChatStore} from "../../../store/CurrentChatStore";
import {useInView} from "react-intersection-observer";

const Messages = () => {

    const messages = useMessagesStore(state => state.messages)
    const messagesEndRef = useRef(null)
    const loggedInUser = useLoggedInUserStore(state => state.currentUser)
    const getMessagesByChatId = useMessagesStore(state => state.getMessagesByChatId)
    const chatId = useCurrentChatStore(state => state.chat.id)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView()
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    useEffect(() => {
        scrollToBottom()
        const intervalId = setInterval(() => {
            getMessagesByChatId(chatId)
        }, 1500)
        return () => {
            clearInterval(intervalId)
        }
    }, []);


    return (
        <div className={cl.messages}>
            {messages.map((message, pos) => {
                    return <Message key={pos} message={message} my={message.user_id === loggedInUser.id}/>
                }
            )}
            <div ref={messagesEndRef}></div>
        </div>
    );
};

export default Messages;