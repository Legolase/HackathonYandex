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

    handleResponse: (response) => {
        const curUserId = useLoggedInUserStore.getState().currentUser.id.toString()
        let data;
        let users = response.data.users;
        for (let k of Object.keys(users)) {
            if (k !== curUserId) {
                data = {
                    id: response.data['id'],
                    avatar: users[k]['avatar'],
                    name: users[k]['name']
                }
            }
        }
        return data
    },

    getChatByUserId: (id, cb) => {
        const params = {
            params: {
                user: id
            }
        }
        axios.get(process.env.REACT_APP_BACKEND_URL + `/api/single_chat`, params).then((response) => {
            // todo: add last activity
            if (response.status === 200) {
                // todo: nulify contact
                get().setChatFromResponse(response)
                cb(`/chat/${get().chat.id}`)
            }
        }).catch((err) => {
            // todo: check keys
            get().createChatWithUserByUserId(id, cb)
        })
    },


    setChatFromResponse: (response) =>{
        useCurrentChatStore.setState(() => ({
            chat: get().handleResponse(response)
        }))
        useMessagesStore.setState(() => ({
            messages: response.data.messages
        }))
    },

    createChatWithUserByUserId: (id, cb) => {
        const params = {
            user: id
        }
        axios.post(process.env.REACT_APP_BACKEND_URL + `/api/single_chat`, params).then((response) => {
            console.log(response.data)
            switch (response.status) {
                case 201:
                    get().setChatFromResponse(response)
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