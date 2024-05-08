import {create} from "zustand";
import axios from "axios";

export const useChatsStore = create((set, get) => ({

    chats: [],
    loading: false,
    error: null,


    fetchChats: function () {
        get().setLoading(true)
        axios.get(process.env.REACT_APP_BACKEND_URL + '/api/chat').then((response) => {
            set(() => (
                {
                    chats: [...response.data],
                    loading: false,
                    error: null
                }
            ))
        }).catch((err) => {
            // todo: check Unauthorized
            set(() => (
                {
                    error: err,
                    loading: false
                }
            ))
        })
    },

    setLoading: (loading) => {
        set(() => (
            {
                loading: loading
            }
        ))
    },


}))
