import React, {useEffect, useState} from 'react';
import {useContactsStore} from "../../store/ContactsStore";
import cl from './CreateGroupChat.module.css'
import FormItem from "../FormItem/FormItem";
import {useModalStore} from "../../store/ModalStore";
import {useCurrentChatStore} from "../../store/CurrentChatStore";
import {useLoggedInUserStore} from "../../store/LoggedInUserStore";

const CreateGroupChat = () => {

    const contacts = useContactsStore(state => state.contacts)
    const fetchContacts = useContactsStore(state => state.fetchContacts)
    const [choosed, setChoosed] = useState(new Set())
    const setActiveModal = useModalStore(state => state.setActive)
    const [chatName, setChatName] = useState('')
    const [error, setError] = useState('')
    const [searchQuery, setQuery] = useState('')
    const [filteredContacts, setFiltered] = useState(contacts)
    const createGroupChat = useCurrentChatStore(state => state.createGroupChat)
    const currentUser = useLoggedInUserStore(state => state.currentUser)

    useEffect(() => {
        if (contacts.length === 0) {
            fetchContacts()
            setFiltered(contacts)
        }
    }, []);


    useEffect(() => {
        const filtered = contacts.filter((contact) => contact.contact_user.name.toLocaleLowerCase().startsWith(searchQuery.toLocaleLowerCase()))
        setFiltered(filtered)
    }, [searchQuery, contacts]);


    if (contacts.length === 0)
        return <span>Loading</span>

    const handleCheck = (event, user_id) => {
        setError('')
        if (event.target.checked)
            setChoosed(new Set([...choosed, user_id]))
        else
            setChoosed(new Set([...choosed.delete(user_id)]))

    }

    const checkInput = () => {
        if (choosed.size === 0) {
            setError('Choose some members')
            return
        }
        if (chatName.trim().length === 0) {
            setError('Name must contains non empty symbols')
            return
        }
        setActiveModal(false)
        const data = {
            name: chatName,
            users: [...choosed, currentUser.id],
            type: 'multi'
        }
        createGroupChat(data)
        // todo: possible navigation to new chat

    }

    return (
        <form className={cl.form} onSubmit={(event) => {
            event.preventDefault()
            checkInput()
        }}>

            <input className={cl.chatName}
                   type={'text'}
                   placeholder={'Search users'}
                   value={searchQuery}
                   onChange={(e) => {
                       setQuery(e.target.value.trim())
                   }}
            />

            <div className={cl.contacts}>
                {filteredContacts.map((contact) => <FormItem contact={contact} handler={handleCheck}/>)}
            </div>

            <input className={cl.chatName}
                   type={'text'}
                   placeholder={'Chat name'}
                   required={true}
                   value={chatName}
                   onChange={(e) => {
                       setError('')
                       setChatName(e.target.value)
                   }}
            />
            <button type={'submit'} className={cl.formButton}>Submit</button>
            {error
                ? <span style={{color: 'red', fontSize: '10px'}}>{error}</span>
                : <></>
            }
        </form>
    );
};

export default CreateGroupChat;