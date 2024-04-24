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
        axios.get(process.env.REACT_APP_BACKEND_URL + query, params).then((response) => {
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


}))

// window.store = useChatsStore
