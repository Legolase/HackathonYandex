import {create} from "zustand";
import axios from "axios";
import {useLoggedInUserStore} from "./LoggedInUserStore";
import {useCurrentChatStore} from "./CurrentChatStore";

export const useMessagesStore = create((set) => ({
    messages: [],
    isLoading: false,
    error: '',


    postMessage: (text) => {
        const params = {
            "type": "text",
            "value": text,
            "from": useLoggedInUserStore.getState().currentUser.id,
            "chat_id": useCurrentChatStore.getState().chat.id
        }
        axios.post('/api/message', params).then(response => {
        }).catch(err => {
        })
    },

    fetchMessages: (offset, id) => {
        set(() => (
            {error: ''}
        ))
        const params = {
            params: {
                offset: offset
            }
        }

        axios.get(process.env.REACT_APP_BACKEND_URL+`/chat/${id}`, params).then(response => {
            if (response.error)
                throw Error(`Error: ${response.status}. ${response.error}`)
            set(state => (
                {
                    chats: [...state.messages, response.data]
                }
            ))
        }).catch(err => {
            set(() => (
                {
                    error: err
                }
            ))
        })
    }


}))