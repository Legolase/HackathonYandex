import React, {useEffect} from 'react';
import Chat from "../Chat/Chat";
import cl from './Chats.module.css'
import {useLeftPanelStore} from "../../store/LeftPanelStore";

const Chats = () => {

    const {contentItems, fetchChats, contacts, fetchContacts, isLoading, error} = useLeftPanelStore()

    useEffect(() => {
        fetchChats(0)
    }, []);

    return (
        <ul className={cl.chats}>
            {contentItems.map(chat =>
                <Chat chat={chat}/>
            )}
        </ul>
    );
};

export default Chats;