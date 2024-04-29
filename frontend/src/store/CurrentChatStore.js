import {create} from "zustand";
import axios from "axios";
import {useMessagesStore} from "./MessagesStore";
import {useRightPanelStore} from "./RightPanelStore";
import {useLoggedInUserStore} from "./LoggedInUserStore";

export const useCurrentChatStore = create((set, get) => ({

    chat: null,
    error: null,
    loading: true,

    setChat: (chat) => {
        set(() => ({
            chat: chat,
            loading: false
        }))
    },

    nullifyChat: () => {
        set(() => ({
            chat: null,
            loading: false
        }))
    },

    fetchChatById: (id) => {
        axios.get(process.env.REACT_APP_BACKEND_URL + `/api/chat/${id}`).then((response) => {

            // todo: Check response code
            set(() => ({
                chat: response.data,
                loading: false
            }))
            useMessagesStore.setState(() => ({
                messages: response.data.messages
            }))
        }).catch((err) => {
            // todo: Handle Err
        })
    },

    getChatByUserId: (id, cb) => {
        const params = {
            params: {
                user: id
            }
        }
        axios.get(process.env.REACT_APP_BACKEND_URL + `/api/single_chat`, params).then((response) => {
            if (response.status === 200) {
                // todo: Change page to chat
                set(() => ({
                    chat: response.data
                }))
                useMessagesStore.setState(() => ({
                    messages: response.data.messages
                }))
                cb(`/chat/${get().chat.id}`)
            }
        }).catch((err) => {
            get().createChatWithUserByUserId(id, cb)
        })
    },

    createChatWithUserByUserId: (id, cb) => {
        // todo: Change name
        const params = {
            type: 'single',
            name: 'Biba',
            users: [id, useLoggedInUserStore.getState().currentUser.id]
        }
        axios.post(process.env.REACT_APP_BACKEND_URL + `/api/chat`, params).then((response) => {
            switch (response.status) {
                case 200:
                    useCurrentChatStore.setState(() => ({
                        chat: response.data
                    }))
                    useMessagesStore.setState(() => ({
                        messages: response.data.messages
                    }))
                    cb(`/chat/${get().chat.id}`)
                    break
                default:
                    console.log(response)
            }
        }).catch((err) => {
            console.log(err)
            switch (err) {

            }
        })
    }


}))