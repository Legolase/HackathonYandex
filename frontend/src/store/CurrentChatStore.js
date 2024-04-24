import {create} from "zustand";
import axios from "axios";
import {useMessagesStore} from "./MessagesStore";

export const useCurrentChatStore = create((set, get) => ({

    chat: null,
    error: null,
    loading: false,


    nullifyChat: () => {
        set(() => ({
            chat: null
        }))
    },

    setChat: (chat) => {
        set(() => ({
            chat: chat
        }))
    },


    fetchChatById: (id) => {
        axios.get(process.env.REACT_APP_BACKEND_URL + `/api/chat/${id}`).then((response) => {

            // todo: Check response code
            set(() => ({
                chat: response.data
            }))
            useMessagesStore.setState(() => ({
                messages: response.data.messages
            }))
        }).catch((err) => {
            // todo: Handle Err
        })
    },

    getChatByUserId: (id) => {
        console.log('fetching')
        const params = {
            user: id
        }
        axios.get(process.env.REACT_APP_BACKEND_URL + `/api/single_chat`, params).then((response) => {
            console.log(response)
            set(() => ({
                chat: response.data
            }))
            useMessagesStore.setState(() => ({
                messages: response.data.messages
            }))
        }).catch((ignore) => {
            console.log(ignore)
            // todo: Request to create chat
        })
    },

    createChatWithUserByUserId: (id) => {
        const params = {
            user: id
        }
        axios.post(process.env.REACT_APP_BACKEND_URL + `/api/single_chat`, params).then((response) => {

        }).catch((err) => {

        })
    }


}))