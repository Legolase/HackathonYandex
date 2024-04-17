import {create} from "zustand";
import axios from "axios";

export const useChatsStore = create((set, get) => ({

    chats: [],
    loading: false,
    error: null,

    fetch: function (offset, query) {
        set(() => (
            {
                error: '',
                loading: true
            }
        ))
        const params = {
            params: {
                offset: offset
            }
        }
        axios.get(query, params).then((response) => {
            if (response.error)
                throw Error(`Error: ${response.status}. ${response.error}`)
            set(() => (
                {
                    contentItems: [...response.data],
                    loading: false
                }
            ))
        }).catch((err) => {
            set(() => (
                {
                    error: err,
                    loading: false
                }
            ))
        })
    },


    fetchChats: function (offset) {
        get().fetch(offset, '/api/chat')
    },

    setLoading: (loading) => {
        set(() => (
            {
                loading: loading
            }
        ))
    },


    setChats: () => {
        set(() => (
            {error: '', loading: true}
        ))
        let url = "https://res.cloudinary.com/practicaldev/image/fetch/s--zqAnyWih--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/dzynqn10l/image/upload/v1632280924/JS%2520Bits/cover_gaenes.jpg";
        set(() => ({
            chats: [
                {
                    "id": 1,
                    "name": "chat_name 1",
                    "avatar": url,
                    "last_message": {
                        "id": 1,
                        "text": "1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum",
                        "datetime": "2024-03-30T08:35:40.742Z",
                        "from": 1,
                        "read": true
                    }
                },
                {
                    "id": 2,
                    "name": "chat_name 2",
                    "avatar": url,
                    "last_message": {
                        "id": 1,
                        "text": "2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum",
                        "datetime": "2024-03-30T08:35:40.742Z",
                        "from": 1,
                        "read": true
                    }
                },
                {
                    "id": 3,
                    "name": "chat_name 3",
                    "avatar": url,
                    "last_message": {
                        "id": 1,
                        "text": "3 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum",
                        "datetime": "2024-03-30T08:35:40.742Z",
                        "from": 1,
                        "read": true
                    }
                }
            ],
            loading: false
        }))
    }

}))

// window.store = useChatsStore
