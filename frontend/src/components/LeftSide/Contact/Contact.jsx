import React, {useEffect, useState} from 'react';
import cl from './Contact.module.css'
import {useCurrentContactStore} from "../../../store/CurrentContactStore";
import {useCurrentChatStore} from "../../../store/CurrentChatStore";
import {useNavigate} from "react-router";
import {formatDistance} from "date-fns";

const Contact = ({contact}) => {

    const root = [cl.contact]
    const setCurrentContact = useCurrentContactStore(state => state.setContact)
    const currentContact = useCurrentContactStore(state => state.contact)
    const active = useCurrentContactStore(state => state.active)
    const nullifyChat = useCurrentChatStore(state => state.nullifyChat)
    const router = useNavigate()
    const setActive = useCurrentContactStore(state => state.setActive)
    const [lastActivity, setLastActivity] = useState(contact.datetime_last_activity);

    useEffect(() => {
        setLastActivity(formatDistance(new Date(), new Date(lastActivity)));
        setInterval(() => {
            setLastActivity(formatDistance(new Date(), new Date(lastActivity)));
        }, 5000);
    }, []);

    if (currentContact && currentContact.id === contact.id && active)
        root.push(cl.active)

    return (
        <li className={root.join(' ')} onClick={() => {
            nullifyChat()
            setCurrentContact(contact)
            setActive(true)
            router(`/user/${contact.id}`)
        }}>
            <img className={cl.avatar} src={contact.avatar} alt={'?'}/>
            <div className={cl.textInfo}>
                <span className={cl.name}>{contact.name}</span>
                <span className={cl.lastSeen}>{`Last seen: ${lastActivity}`}</span>
            </div>
        </li>
    );
};

export default Contact;