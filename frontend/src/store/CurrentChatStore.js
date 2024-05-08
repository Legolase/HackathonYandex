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

    fetchChatById: (id) => {
        get().setLoading(true)
        axios.get(process.env.REACT_APP_BACKEND_URL + `/api/chat/${id}`).then((response) => {
            set(() => ({
                chat: response.data,
                loading: false
            }))
            useMessagesStore.setState(() => ({
                messages: response.data.messages
            }))
        }).catch((error) => {
            // todo: check keys
            // todo: посмотреть как выглядят ошибки
        })
    },

    getSingleChatByUserId: (id, cb) => {
        const params = {
            params: {
                user: id
            }
        }
        axios.get(process.env.REACT_APP_BACKEND_URL + `/api/single_chat`, params).then((response) => {
            get().setChatFromResponse(response)
            cb(`/chat/${get().chat.id}`)
        }).catch((err) => {
            // todo: check keys
            // todo: посмотреть как выглядят ошибки
            get().createChatByUserId(id, cb)
        })
    },


    createChatByUserId: (id, cb) => {
        const params = {
            user: id
        }
        axios.post(process.env.REACT_APP_BACKEND_URL + `/api/single_chat`, params).then((response) => {
            get().setChatFromResponse(response)
            cb(`/chat/${response.data.id}`)
        }).catch((err) => {
            // todo: check keys
            // todo: посмотреть как выглядят ошибки
        })
    },


    // for getting name and avatar of chat (single chat) - its name and
    getDataByChat: (chat) => {
        // todo: check chatType before
        const loggedUser = useLoggedInUserStore.getState().currentUser
        const users = chat.users
        for (const usersKey in users) {
            if (loggedUser.id.toString() !== usersKey) {
                return {
                    name: users[usersKey].name,
                    avatar: users[usersKey].avatar
                }
            }
        }
    },

    // only for singleChat
    handleResponse: (response) => {
        const curUserId = useLoggedInUserStore.getState().currentUser.id.toString()
        let data;
        let users = response.data.users;
        for (let k of Object.keys(users)) {
            if (k !== curUserId) {
                data = {
                    id: response.data.id,
                    avatar: users[k].avatar,
                    name: users[k].name
                }
            }
        }
        return data
    },

    setChatFromResponse: (response) => {
        set(() => ({
            chat: get().handleResponse(response)
        }))
        useMessagesStore.setState(() => ({
            messages: response.data.messages
        }))
    },

}))