import React from 'react';
import cl from './Contact.module.css'

const Contact = ({contact}) => {
    return (
        <li className={cl.contact}>
            <img className={cl.avatar} src={contact.avatar}/>
            <div className={cl.textInfo}>
                <span className={cl.name}>{contact.name}</span>
                <span className={cl.lastSeen}>{`Last seen: ${contact.last_seen}`}</span>
            </div>
        </li>
    );
};

export default Contact;