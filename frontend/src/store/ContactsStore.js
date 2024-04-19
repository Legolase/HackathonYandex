import {create} from "zustand";
import axios from "axios";

export const useContactsStore = create((set, get) => ({

    contacts: [],
    loading: false,
    error: null,

    setLoading: () => {
        set(() => (
            {loading: true}
        ))
    },

    fetch: function (offset, query) {
        set(() => (
            {error: null, loading: true}
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
                    contacts: [...response.data],
                    loading: false
                }
            ))
        }).catch((err) => {
            set(() => (
                {
                    error: err,
                    loading: false,
                }
            ))
        })
    },

    fetchContacts: (offset) => {
        get().fetch(offset, '/api/user')
    },

    setContacts: () => {
        set(() => (
            {error: '', loading: true}
        ))
        let url = "https://res.cloudinary.com/practicaldev/image/fetch/s--zqAnyWih--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/dzynqn10l/image/upload/v1632280924/JS%2520Bits/cover_gaenes.jpg";
        set(() => ({
            contacts: [
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
            ],
            loading: false
        }))
    },

}))
window.store = useContactsStore