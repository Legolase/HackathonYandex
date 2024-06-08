import {create} from "zustand";
import axios from "axios";
import {useMessagesStore} from "./MessagesStore";
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

    setLoading: (loading) => {
        set(() => ({
            loading: loading
        }))
    },

    getChatById: (id) => {
        get().setLoading(true)
        axios.get(`/api/chat/${id}`).then((response) => {
            get().setChatFromResponse(response)
        }).catch((error) => {
            // todo: check keys
            // todo: посмотреть как выглядят ошибки
        })
    },

    getSingleChatByUserId: (id, cb) => {
        get().setLoading(true)
        const params = {
            params: {
                user: id
            }
        }
        axios.get(`/api/single_chat`, params).then((response) => {
            get().setChatFromResponse(response)
            cb(`/chat/${get().chat.id}`)
        }).catch((err) => {
            // todo: check keys
            // todo: посмотреть как выглядят ошибки
            get().createChatByUserId(id, cb)
        })
    },


    createChatByUserId: (id, cb) => {
        get().setLoading(true)
        const params = {
            user: id
        }
        axios.post(`/api/single_chat`, params).then((response) => {
            get().setChatFromResponse(response)
            cb(`/chat/${response.data.id}`)
        }).catch((err) => {
            // todo: check keys
            // todo: посмотреть как выглядят ошибки
        })
    },


    // for getting name and avatar of single chat - its own name and avatar
    getDataByChat: (chat) => {
        if (chat.type === 'multi')
            return chat
        const loggedUser = useLoggedInUserStore.getState().currentUser
        const users = chat.users
        for (const usersKey in users) {
            if (loggedUser.id.toString() !== usersKey) {
                return {
                    name: users[usersKey].name,
                    avatar: users[usersKey].avatar,
                    last_seen: users[usersKey].datetime_last_activity
                }
            }
        }
    },

    createGroupChat: (data) => {
        axios.post('/api/chat', data).then(r => {
            console.log(r.data)
        }).catch((e) => {

        })
    },

    setChatFromResponse: (response) => {
        set(() => ({
            chat: response.data,
            loading: false
        }))
        useMessagesStore.setState(() => ({
            messages: response.data.messages
        }))
    },

    getInvite: (id) => {
        axios.get(`/api/chat/${id}/invite`).then(r => {
            console.log(r)
            return r.data
        })
    }


}))