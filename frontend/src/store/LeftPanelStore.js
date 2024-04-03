import {create} from "zustand"
import axios from "axios";

export const useLeftPanelStore = create((set) => ({
    contentItems: [],
    isLoading: false,
    error: '',

    setEmptyContent: () => {
        set(() => ({contentItems: []}))
    },


    fetchChats: function (offset) {
        set(() => (
            {error: '', isLoading: true}
        ))
        const params = {
            params: {
                offset: offset
            }
        }
        axios.get('/chat/list', params).then((response) => {
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

    fetchContacts: (offset) => {
        set(() => (
            {error: '', isLoading: true}
        ))
        const params = {
            params: {
                offset: offset
            }
        }
        axios.get('/contact/list', params).then((response) => {
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
    }


}))