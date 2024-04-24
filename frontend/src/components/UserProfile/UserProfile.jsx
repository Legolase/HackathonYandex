import React from 'react';
import cl from './UserProfile.module.css'
import Button from "../Button/Button";
import {useCurrentContactStore} from "../../store/CurrentContactStore";
import {useCurrentChatStore} from "../../store/CurrentChatStore";

const UserProfile = () => {


    const contact = useCurrentContactStore(state => state.contact)
    const fetchChatByUserId = useCurrentChatStore(state => state.getChatByUserId)

    const beginChat = () => {
        // todo: Change page to chat
        fetchChatByUserId(contact.id)
    };
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