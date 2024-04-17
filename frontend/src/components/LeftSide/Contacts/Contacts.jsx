import React, {useEffect} from 'react';
import cl from "../List/List.module.css";
import Contact from "../Contact/Contact";
import {useContactsStore} from "../../../store/ContactsStore";
import {useTabsStore} from "../../../store/TabsStore";
import {useChangeActive} from "../../../hooks/useChangeActive";

const Contacts = () => {


    const {contacts, loading} = useContactsStore()
    const {active} = useTabsStore()
    const [, downloadContacts] = useChangeActive()

    useEffect(() => {
        if (contacts.length !== 0)
            return
        downloadContacts()
    }, [active]);

    if (loading)
        return <span>LOADING</span>

    return (
        <ul className={cl.chats}>
            {contacts.map((contact, pos) =>
                <div>
                    <Contact contact={contact} key={pos}/>
                </div>
            )}
        </ul>
    );
};

export default Contacts;