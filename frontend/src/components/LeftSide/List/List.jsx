import React from 'react';
import Contacts from "../Contacts/Contacts";
import Chats from "../Chats/Chats";
import {useTabsStore} from "../../../store/TabsStore";

const List = () => {


    const {active} = useTabsStore()

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