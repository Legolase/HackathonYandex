import React from 'react';
import cl from './CurrentChatProfile.module.css'
import {useCurrentChatStore} from "../../../store/CurrentChatStore";
import {useNavigate} from "react-router";
import {useLoggedInUserStore} from "../../../store/LoggedInUserStore";
import {useCurrentContactStore} from "../../../store/CurrentContactStore";

const CurrentChatProfile = ({chat}) => {

    const nullifyChat = useCurrentChatStore(state => state.nullifyChat)
    const getDataByChat = useCurrentChatStore(state => state.getDataByChat)
    const loggedUser = useLoggedInUserStore(state => state.currentUser)
    const getContact = useCurrentContactStore(state => state.fetchContact)
    const router = useNavigate()
    const data = getDataByChat(chat)

    const getIdOfUser = () => {
        const users = chat.users
        for (const usersKey in users) {
            if (loggedUser.id.toString() !== usersKey) {
                return users[usersKey].id
            }
        }
    }

    return (
        <div className={cl.chat}>
            <img className={cl.avatar} src={data.avatar} onClick={() => {
                const id = getIdOfUser()
                getContact(id)
                nullifyChat()
                router(`/user/${id}`)
                // todo: Make request for contact of this chat
            }}/>
            <div className={cl.textInfo}>
                <span className={cl.name}>{data.name}</span>
                {/*todo: Line below for last seen*/}
                <span className={cl.lastMessage}></span>
            </div>
        </div>
    );
};

export default CurrentChatProfile;