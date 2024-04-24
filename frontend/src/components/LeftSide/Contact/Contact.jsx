import React, {useState} from 'react';
import cl from './Contact.module.css'
import {useRightPanelStore} from "../../../store/RightPanelStore";
import {useCurrentContactStore} from "../../../store/CurrentContactStore";
import {useCurrentChatStore} from "../../../store/CurrentChatStore";
import {useNavigate} from "react-router";

const Contact = ({contact}) => {

    const root = [cl.contact]
    const setCurrentContact = useCurrentContactStore(state => state.setContact)
    const currentContact = useCurrentContactStore(state => state.contact)
    const nullifyChat = useCurrentChatStore(state => state.nullifyChat)
    const router = useNavigate()

    if (currentContact && currentContact.id === contact.id)
        root.push(cl.active)

    return (
        <li className={root.join(' ')} onClick={() => {
            nullifyChat()
            setCurrentContact(contact)
            router(`/user/${contact.id}`)
        }}>
            <img className={cl.avatar} src={contact.avatar} alt={'?'}/>
            <div className={cl.textInfo}>
                <span className={cl.name}>{contact.name}</span>
                <span className={cl.lastSeen}>{`Last seen: ${contact.last_seen}`}</span>
            </div>
        </li>
    );
};

export default Contact;