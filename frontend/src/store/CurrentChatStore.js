import {create} from "zustand";
import axios from "axios";

export const useCurrentChatStore = create((set, get) => ({

    chat: null,
    error: null,
    loading: false,


    nullifyChat: () => {
        set(() => ({
            chat: null
        }))
    },

    setChat: (chat) => {
        set(() => ({
            chat: chat
        }))
    },


    fetchChat: (id) => {
        axios.get(`/api/chat/${id}`).then((response) => {
            // todo: Check response code
            set(() => ({
                chat: response.data
            }))
        }).catch((err) => {
            // todo: Handle Err
        })
    }


}))