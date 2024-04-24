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
        axios.get(process.env.REACT_APP_BACKEND_URL + query, params).then((response) => {
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



}))
window.store = useContactsStore