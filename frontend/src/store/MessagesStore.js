import {create} from "zustand";
import axios, {get} from "axios";
import {useLoggedInUserStore} from "./LoggedInUserStore";
import {useCurrentChatStore} from "./CurrentChatStore";

export const useMessagesStore = create((set, get) => ({

    messages: [],
    foundMessages: [],
    isLoading: false,
    error: null,

    addMessage: (message) => {
        set(() => ({
            messages: [ message, ...get().messages]
        }))
    },

    postFile: (file) => {
        const params = {
            "type": "image",
            "value": file,
            "from": useLoggedInUserStore.getState().currentUser.id,
            "chat_id": useCurrentChatStore.getState().chat.id
        }
        axios.post('/api/message', params, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {

        }).catch(err => {
            // todo: check error codes
        })
    },

    postMessage: (text) => {
        const params = {
            "type": "text",
            "value": text,
            "from": useLoggedInUserStore.getState().currentUser.id,
            "chat_id": useCurrentChatStore.getState().chat.id
        }
        axios.post('/api/message', params).then(response => {
        }).catch(err => {
            // todo: check error codes
        })
    },

    getMessagesByChatId: (id) => {
        axios.get(`/api/chat/${id}`).then((response) => {
            set(() => ({
                messages: response.data.messages.reverse()
            }))
        }).catch((err) => {
            // todo: check error codes
        })
    },

    findMessages: (id, query) => {
        // todo: ТЕБЕ НАДО ЭТО
        axios.get(`/api/message/${id}`, {
            params: {
                query: query
            }
        }).then((res) => {
            set(() => ({
                foundMessages: res.data
            }))
        }).catch((err) => {

        })
    },

    setFoundMessages: (messages) => {
        set(() => ({
            foundMessages: messages
        }))
    }

}))