import React, {useEffect, useState} from 'react';
import cl from './CurrentChatProfile.module.css'
import {useCurrentChatStore} from "../../../store/CurrentChatStore";
import {useNavigate} from "react-router";
import {useLoggedInUserStore} from "../../../store/LoggedInUserStore";
import {useCurrentContactStore} from "../../../store/CurrentContactStore";
import {formatDistance} from "date-fns";
import {useMessagesStore} from "../../../store/MessagesStore";
import {BackIcon, DotsIcon} from "../../Icon/Icon";

const CurrentChatProfile = ({chat}) => {

    const nullifyChat = useCurrentChatStore(state => state.nullifyChat)
    const getDataByChat = useCurrentChatStore(state => state.getDataByChat)
    const loggedUser = useLoggedInUserStore(state => state.currentUser)
    const getContact = useCurrentContactStore(state => state.fetchContact)
    const [activeSearch, setActiveSearch] = useState(false)
    const router = useNavigate()
    const [searchQuery, setQuery] = useState('')
    const setFoundMessages = useMessagesStore(state => state.setFoundMessages)
    const data = getDataByChat(chat)
    const messages = useMessagesStore(state => state.messages)
    const [filtered, setFiltered] = useState([])
    const getInviteLink = useCurrentChatStore(state => state.getInvite)

    useEffect(() => {
        let filtered
        if (searchQuery === '')
            filtered = []
        else
            filtered = messages.filter((message) => {
                return message.type === 'text' && message.value.includes(searchQuery)
            })
        setFiltered(filtered)

    }, [searchQuery]);

    const getIdOfUser = () => {
        const users = chat.users
        for (const usersKey in users) {
            if (loggedUser.id.toString() !== usersKey) {
                return users[usersKey].id
            }
        }
    }

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const getSearchButton = () => {
        if (!activeSearch)
            return (<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M20.0311 20.79C20.4911 21.25 21.2011 20.54 20.7411 20.09L16.9911 16.33C18.3065 14.8745 19.0336 12.9818 19.0311 11.02C19.0311 6.63 15.4611 3.06 11.0711 3.06C6.68108 3.06 3.11108 6.63 3.11108 11.02C3.11108 15.41 6.68108 18.98 11.0711 18.98C13.0511 18.98 14.8811 18.25 16.2811 17.04L20.0311 20.79ZM4.11008 11.02C4.11008 7.18 7.24008 4.06 11.0701 4.06C14.9101 4.06 18.0301 7.18 18.0301 11.02C18.0301 14.86 14.9101 17.98 11.0701 17.98C7.24008 17.98 4.11008 14.86 4.11008 11.02Z"
                    fill="gray"/>
            </svg>)
        else
            return (
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                     onClick={() => {
                         setFiltered([])
                     }}>
                    <path
                        d="M22.7914 3.62571C23.4589 2.95824 23.4589 1.87605 22.7914 1.20857C22.124 0.541096 21.0418 0.541096 20.3743 1.20857L12 9.58286L3.62571 1.20857C2.95824 0.541095 1.87605 0.541096 1.20857 1.20857C0.541096 1.87605 0.541096 2.95824 1.20857 3.62571L9.58286 12L1.20857 20.3743C0.541095 21.0418 0.541096 22.124 1.20857 22.7914C1.87605 23.4589 2.95824 23.4589 3.62571 22.7914L12 14.4171L20.3743 22.7914C21.0418 23.4589 22.124 23.4589 22.7914 22.7914C23.4589 22.124 23.4589 21.0418 22.7914 20.3743L14.4171 12L22.7914 3.62571Z"
                        fill="gray"/>
                </svg>
            )
    }

    const getSearchBar = () => {
        if (activeSearch)
            return (<div className={cl.search}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M20.0311 20.79C20.4911 21.25 21.2011 20.54 20.7411 20.09L16.9911 16.33C18.3065 14.8745 19.0336 12.9818 19.0311 11.02C19.0311 6.63 15.4611 3.06 11.0711 3.06C6.68108 3.06 3.11108 6.63 3.11108 11.02C3.11108 15.41 6.68108 18.98 11.0711 18.98C13.0511 18.98 14.8811 18.25 16.2811 17.04L20.0311 20.79ZM4.11008 11.02C4.11008 7.18 7.24008 4.06 11.0701 4.06C14.9101 4.06 18.0301 7.18 18.0301 11.02C18.0301 14.86 14.9101 17.98 11.0701 17.98C7.24008 17.98 4.11008 14.86 4.11008 11.02Z"
                        fill="gray"/>
                </svg>
                <input className={cl.input} placeholder={'Search'} value={searchQuery} onChange={(e) => {
                    setQuery(e.target.value)
                    if (e.target.value === '')
                        setFoundMessages([])
                }}/>
            </div>)
        return <></>
    }


    const getMessage = (message) => {
        if (message.user_id === loggedUser.id)
            return (
                <>
                    <img src={loggedUser.avatar} className={cl.avatar}/>
                    <div className={cl.metaInf}>
                        <span className={cl.name}>{loggedUser.name}</span>
                        <span className={cl.messageValue}>{message.value}</span>
                    </div>
                </>
            )
        else
            return (
                <>
                    <img src={data.avatar} className={cl.avatar}/>
                    <div className={cl.metaInf}>
                        <span className={cl.name}>{data.name}</span>
                        <span className={cl.messageValue}>{message.value}</span>
                    </div>
                </>)
    }

    const getDots = () => {
        return (chat.type === 'multi' && <DotsIcon className={cl.dots} onClick={() => {
            navigator.clipboard.writeText(`${window.location.hostname}/chat/invite/${chat.id}`)
        }}/>)
    }

    return (
        <>
            <div className={cl.chat}>
                <BackIcon className={`setting_icon ${cl.back} ${cl.mobileBack}`} onClick={() => {
                    router('/')
                }}/>
                <img className={cl.avatar} src={data.avatar} onClick={() => {
                    const id = getIdOfUser()
                    getContact(id)
                    nullifyChat()
                    router(`/user/${id}`)
                }}/>
                <div className={cl.textInfo}>
                    <span className={cl.name}>{data.name}</span>
                    {!data.type &&
                        <span
                            className={cl.lastMessage}>Last online: {formatDistance(new Date(), new Date(data.last_seen))}</span>
                    }
                </div>

                {getSearchBar()}

                <div className={cl.searchMessages} onClick={() => {
                    setActiveSearch(!activeSearch)
                }}>
                    {getSearchButton()}
                </div>

                {getDots()}
            </div>
            {filtered
                ? <div className={cl.foundMessages}>
                    {filtered.map((message) =>
                        <div className={cl.message}>
                            <div className={cl.avatarAndMeta}>
                                {getMessage(message)}
                            </div>
                            <span className={cl.time}>{formatTime(message.datetime)}</span>
                        </div>
                    )}
                </div>
                : <></>}
        </>

    );
};

export default CurrentChatProfile;