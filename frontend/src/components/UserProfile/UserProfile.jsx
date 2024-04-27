import React, {useEffect} from 'react';
import cl from './UserProfile.module.css'
import Button from "../Button/Button";
import {useCurrentContactStore} from "../../store/CurrentContactStore";
import {useCurrentChatStore} from "../../store/CurrentChatStore";
import {useParams} from "react-router-dom";

const UserProfile = () => {


    const contact = useCurrentContactStore(state => state.contact)
    const fetchChatByUserId = useCurrentChatStore(state => state.getChatByUserId)
    const loading = useCurrentContactStore(state => state.loading)
    const fetchContact = useCurrentContactStore(state => state.fetchContact)

    const {contactId} = useParams()

    useEffect(() => {
        console.log(contactId)
        fetchContact(contactId)
    }, [contactId]);

    const beginChat = () => {
        // todo: Change page to chat
        fetchChatByUserId(contact.id)
    };

    if (loading)
        return <span>LOADING</span>
    return (
        <div className={cl.userProfile}>
            <div className={cl.header}>
                <img className={cl.avatar} src={contact.avatar}/>
                <div className={cl.textInfo}>
                    <span className={cl.name}>{contact.name}</span>
                    <span className={cl.login}>@{contact.login}</span>
                </div>
            </div>
            <div className={cl.buttons}>
                <Button
                    name={'Message'}
                    onClickHandler={beginChat}>
                </Button>
                <Button
                    name={'Add to contacts'}
                    onClickHandler={() => {
                    }}>
                </Button>
            </div>
        </div>
    );
};

export default UserProfile;