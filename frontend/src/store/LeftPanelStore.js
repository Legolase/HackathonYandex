import {create} from "zustand"
import axios from "axios";

export const useLeftPanelStore = create((set) => ({
    chats: [],
    contacts: [],
    isLoading: false,
    error: '',
    active: 'chats',


    fetchChats: function (offset) {
        set(() => (
            {error: ''}
        ))
        // add body parameter offset = id of last chat
        axios.get('/chat/list').then((response) => {
            if (response.error)
                throw Error(`Error: ${response.status}. ${response.error}`)
            set(state => (
                {
                    chats: [...state.chats, response.data]
                }
            ))

        }).catch((err) => {
            set(() => (
                {
                    error: err
                }
            ))
        })
    },

    fetchContacts: (offset) => {
        set(() => (
            {error: ''}
        ))
        // add body parameter offset = id of last chat
        axios.get('/contact/list').then((response) => {
            if (response.error)
                throw Error(`Error: ${response.status}. ${response.error}`)
            set(state => (
                {
                    contacts: [...state.contacts, response.data]
                }
            ))

        }).catch((err) => {
            set(() => (
                {
                    error: err
                }
            ))
        })
    }


}))