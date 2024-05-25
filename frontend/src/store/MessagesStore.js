import {create} from "zustand";
import axios, {get} from "axios";
import {useLoggedInUserStore} from "./LoggedInUserStore";
import {useCurrentChatStore} from "./CurrentChatStore";
import message from "../components/RightSide/Message/Message";

export const useMessagesStore = create((set, get) => ({

    messages: [],
    isLoading: false,
    error: null,

    addMessage: (message) => {
        set(() => ({
            messages: [...get().messages, message]
        }))
    },

    postFile: (file) => {
        const params = {
            "type": "image",
            "value": file,
            "from": useLoggedInUserStore.getState().currentUser.id,
            "chat_id": useCurrentChatStore.getState().chat.id
        }
        console.log(params);
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
                messages: response.data.messages
            }))
        }).catch((err) => {
            // todo: check error codes
        })
    }

}))