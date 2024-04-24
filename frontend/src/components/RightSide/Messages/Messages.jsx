import React, {useEffect, useRef} from 'react';
import cl from './Messages.module.css'
import Message from "../Message/Message";
import {useMessagesStore} from "../../../store/MessagesStore";

const Messages = () => {

    const messages = useMessagesStore(state => state.messages)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView()
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);


    return (
        <div className={cl.messages}>
            {messages.map((message, pos) => {
                return (<Message key={pos} message={message} my={message.from === 1}/>)
                }
            )}
            <div ref={messagesEndRef}></div>
        </div>
    );
};

export default Messages;