import React, {useEffect} from 'react';
import {useCurrentChatStore} from "../../store/CurrentChatStore";
import {useParams} from "react-router-dom";

const Invite = () => {

    const {chatId} = useParams()
    const getInviteLink = useCurrentChatStore(state => state.getInvite)

    useEffect(() => {
        getInviteLink(chatId)
    }, []);


    return (
        <div>

        </div>
    );
};

export default Invite;