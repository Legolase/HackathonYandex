import React from 'react';
import cl from './Messages.module.css'
import Message from "../Message/Message";
const Messages = ({messages}) => {
    return (
        <div className={cl.messages} style={{height: '100%'}}>
            {messages.map(message =>
                <Message message={message} my={message.from === 1}/>
            )}
        </div>
    );
};

export default Messages;