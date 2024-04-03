import React, {useEffect, useRef} from 'react';
import cl from './Messages.module.css'
import Message from "../Message/Message";
import {useMessagesStore} from "../../store/MessagesStore";

const Messages = () => {

    const messages = useMessagesStore(state => state.messages)
    const setMessages = useMessagesStore(state => state.setMessages)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () =>{
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    useEffect(() => {
        setMessages()
    }, []);

    return (
        <div className={cl.messages}>
            {messages.map((message, pos) =>
                <Message key={pos} message={message} my={message.from === 1}/>
            )}
            <div ref={messagesEndRef}></div>
        </div>
    );
};

export default Messages;