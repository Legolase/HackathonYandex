import {create} from "zustand"
import axios from "axios";
import zukeeper from "zukeeper";

export const useLeftPanelStore = create(zukeeper((set, get) => ({
    contentItems: [],
    isLoading: false,
    error: '',
    active: 'Messages',

    // ---------------------------------------------------------------------------------
    // --------------------------------This is for testing------------------------------
    // ---------------------------------------------------------------------------------
    setChats: () => {
        let url = "https://res.cloudinary.com/practicaldev/image/fetch/s--zqAnyWih--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/dzynqn10l/image/upload/v1632280924/JS%2520Bits/cover_gaenes.jpg";
        set(() => ({
            contentItems: [
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
            ]
        }))
    },


    setContacts: () => {
        let url = "https://res.cloudinary.com/practicaldev/image/fetch/s--zqAnyWih--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/dzynqn10l/image/upload/v1632280924/JS%2520Bits/cover_gaenes.jpg";
        set(() => ({
            contentItems: [
                {
                    "id": 1,
                    "name": "chat_name 1",
                    "avatar": url,
                    "last_seen": '10.20.23'
                },
                {
                    "id": 2,
                    "name": "chat_name 2",
                    "avatar": url,
                    "last_seen": '10.20.23'
                },
                {
                    "id": 3,
                    "name": "chat_name 3",
                    "avatar": url,
                    "last_seen": '10.20.23'
                }
            ]
        }))
    },
    // ---------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------
    // ---------------------------------------------------------------------------------

    setLoading: (loading) =>{
        set(() => ({
            isLoading: loading
        }))
    },

    setActive: (active) => {
        set(() => ({
            active: active
        }))
    },


    setEmptyContent: () => {
        set(() => ({contentItems: []}))
    },


    fetch:function (offset, query) {
        set(() => (
            {error: '', isLoading: true}
        ))
        const params = {
            params: {
                offset: offset
            }
        }
        axios.get(query, params).then((response) => {
            if (response.error)
                throw Error(`Error: ${response.status}. ${response.error}`)
            set(state => (
                {
                    contentItems: [...state.contentItems, response.data],
                    isLoading: false
                }
            ))
        }).catch((err) => {
            set(() => (
                {
                    error: err,
                    isLoading: false
                }
            ))
        })
    },


    fetchChats: function (offset){
        // изменить query запрос на адекватный
        get().fetch(offset, '/api/chat?user=1')
    },


    fetchContacts: (offset) => {
        get().fetch(offset, '/api/contact/list')
    }


})))

window.store = useLeftPanelStore