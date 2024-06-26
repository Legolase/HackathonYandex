import React, {useEffect} from 'react';
import {useCurrentChatStore} from "../../store/CurrentChatStore";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router";

const Invite = () => {

    const {chatId} = useParams()
    const getInviteLink = useCurrentChatStore(state => state.getInvite)
    const router = useNavigate()
    const setCurChat = useCurrentChatStore(state => state.setChat)

    useEffect(async () => {
        const res = await getInviteLink(chatId)
        const chat = res.data
        console.log(chat)
        setCurChat(chat)
        router(`/chat/${chat.id}`)
    }, []);


    return (
        <div>

        </div>
    );
};

export default Invite;