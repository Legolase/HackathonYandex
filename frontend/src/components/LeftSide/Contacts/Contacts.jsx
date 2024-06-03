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
    const searchQuery = useContactsStore(state => state.searchQuery)
    const queriedContacts = useContactsStore(state => state.queriedContacts)
    const queriedUsers = useContactsStore(state => state.queriedUsers)


    useEffect(() => {
        if (contacts.length !== 0)
            return
        downloadContacts()
    }, [active]);

    if (loading)
        return <span>LOADING</span>

    if (searchQuery)
        return (
            <ul className={cl.chats}>
                {queriedContacts.map((contact, pos) => {
                    return (
                        <div>
                            <Contact contact={contact} key={pos}/>
                        </div>
                    )
                })}
                <hr/>
                {queriedUsers.map((user, pos) =>
                    <div>
                        <Contact contact={user} key={pos}/>
                    </div>
                )}
            </ul>

        )
    return (
        <ul className={cl.chats}>
            {contacts.map((contact, pos) =>
                <div>
                    <Contact contact={contact.contact_user} key={pos}/>
                </div>
            )}
        </ul>
    );
};

export default Contacts;