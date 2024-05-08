import {create} from "zustand";
import axios from "axios";
import {useLoggedInUserStore} from "./LoggedInUserStore";
import {useCurrentChatStore} from "./CurrentChatStore";

export const useMessagesStore = create((set) => ({

    messages: [],
    isLoading: false,
    error: null,


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