import React from 'react';
import Contacts from "../Contacts/Contacts";
import Chats from "../Chats/Chats";
import {useNavStore} from "../../../store/NavStore";

const List = () => {



    const {active} = useNavStore()

    if (active === 'allChats') {
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