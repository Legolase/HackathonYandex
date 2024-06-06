import React, {useEffect} from 'react';
import cl from './UserProfile.module.css'
import {useCurrentContactStore} from "../../store/CurrentContactStore";
import {useCurrentChatStore} from "../../store/CurrentChatStore";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router";
import Setting from "../Setting/Setting";

const UserProfile = () => {
    const contact = useCurrentContactStore(state => state.contact)
    const fetchChatByUserId = useCurrentChatStore(state => state.getSingleChatByUserId)
    const loading = useCurrentContactStore(state => state.loading)
    const fetchContact = useCurrentContactStore(state => state.fetchContact)
    const setActive = useCurrentContactStore(state => state.setActive)
    const createChatByUserId = useCurrentContactStore(state => state.createContact)

    const {contactId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetchContact(contactId)
    }, [contactId]);


    const moveToChat = (query) => {
        navigate(query)
    }

    const beginChat = () => {
        fetchChatByUserId(contact.id, moveToChat)
        setActive(false)
    };

    if (loading)
        return <span>LOADING</span>
    return (
        <div className={`${cl.userProfile} right-side`}>
            <div className={cl.header}>
                <img className={cl.avatar} src={contact.avatar}/>
                <div className={cl.textInfo}>
                    <span className={cl.name}>{contact.name}</span>
                    <span className={cl.login}>@{contact.login}</span>
                </div>
            </div>
            <div className={cl.buttons}>
                <Setting name={'allChats'} text={'Write message'} handler={beginChat}/>
                <Setting name={'contacts'} text={'Add to contacts'} handler={() => createChatByUserId(contact.id)}/>
            </div>
        </div>
    );
};

export default UserProfile;