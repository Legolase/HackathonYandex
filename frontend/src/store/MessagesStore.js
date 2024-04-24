import {create} from "zustand";
import axios from "axios";
import {useLoggedInUserStore} from "./LoggedInUserStore";

export const useMessagesStore = create((set) => ({
    messages: [],
    isLoading: false,
    error: '',

    setMessages: () => {
        set(() => ({
            messages: [
                {
                    "id": 1,
                    "text": "1 **Lorem** 🥺ipsum `dolor` sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum",
                    "datetime": "2024-03-30T08:00:40.742Z",
                    "from": 1,
                    "read": true
                },
                {
                    "id": 2,
                    "text": "2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum",
                    "datetime": "2024-03-30T08:05:40.742Z",
                    "from": 2,
                    "read": true
                },
                {
                    "id": 3,
                    "text": "3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum",
                    "datetime": "2024-03-30T08:10:40.742Z",
                    "from": 1,
                    "read": true
                },
                {
                    "id": 4,
                    "text": "4 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum",
                    "datetime": "2024-03-30T08:15:40.742Z",
                    "from": 2,
                    "read": true
                },
                {
                    "id": 4,
                    "text": "4 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum",
                    "datetime": "2024-03-30T08:15:40.742Z",
                    "from": 2,
                    "read": true
                },
                {
                    "id": 4,
                    "text": "4 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum",
                    "datetime": "2024-03-30T08:15:40.742Z",
                    "from": 2,
                    "read": true
                }
            ]
        }))
    },

    addMessage: (message) => {
        const mess = {
            "id": 4,
            "text": message,
            "datetime": "2024-03-30T08:15:40.742Z",
            "from": 2,
            "read": true
        }
        set(state => ({
            messages: [...state.messages, mess]
        }))
    },


    postMessage: (text) => {
        const params = {
            "type": "text",
            "value": text,
            "from": useLoggedInUserStore.getState().currentUser.id,
            "chat_id": 1
        }
        axios.post('/api/message', params).then(r => {
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