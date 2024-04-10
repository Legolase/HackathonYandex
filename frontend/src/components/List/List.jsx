import React, {useEffect} from 'react';
import {useLeftPanelStore} from "../../store/LeftPanelStore";
import Contacts from "../Contacts/Contacts";
import Chats from "../Chats/Chats";

const List = () => {

    const {contentItems, fetchChats, fetchContacts, isLoading, error, active} = useLeftPanelStore()
    const setChats = useLeftPanelStore(state => state.setChats)
    const setContacts = useLeftPanelStore(state => state.setContacts)


    useEffect(() => {
        console.log(active)
        if (active === 'Messages') {
            // setChats()
            fetchChats(0)
        } else {
            // setContacts()
            fetchContacts(0)
        }
    }, [active]);

    if (isLoading)
        return <span>LOADING</span>

    if (active === 'Messages') {
        return (
            <Chats/>
        );
    }
    else {
        return (
            <Contacts/>
        );
    }
};

export default List;