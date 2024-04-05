import React, {useEffect} from 'react';
import Chat from "../Chat/Chat";
import cl from './List.module.css'
import {useLeftPanelStore} from "../../store/LeftPanelStore";
import Contact from "../Contact/Contact";

const List = () => {

    const {contentItems, fetchChats, fetchContacts, isLoading, error, active} = useLeftPanelStore()
    const setChats = useLeftPanelStore(state => state.setChats)
    const setContacts = useLeftPanelStore(state => state.setContacts)


    useEffect(() => {
        console.log(active)
        if (active === 'Messages') {
            setChats()
            // fetchChats(0)
        } else {
            setContacts()
            // fetchContacts(0)
        }
    }, [active]);


    if (active === 'Messages') {
        // console.log(contentItems.length)
        // console.log('Chat' + contentItems.toString())
        return (
            <ul className={cl.chats}>
                {contentItems.map((chat, pos) =>
                    <Chat chat={chat} key={pos}/>
                )}
            </ul>
        );
    }
    else {
        // console.log(contentItems.length)
        // console.log('Contact' + contentItems.toString())
        return (
            <ul className={cl.chats}>
                {contentItems.map((contact, pos) =>
                    <Contact contact={contact} key={pos}/>
                )}
            </ul>
        );
    }
};

export default List;