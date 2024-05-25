import {create} from "zustand";
import axios from "axios";

export const useCurrentContactStore = create((set, get) => ({
    contact: null,
    error: null,
    loading: true,
    active: false,

    setLoading: (loading) =>{
        set(() => ({
            loading: loading
        }))
    },

    setActive: (active) =>{
        set(() => ({
            active: active
        }))
    },

    nullifyContact: () => {
        set(() => ({
            contact: null,
            loading: false
        }))
    },

    setContact: (contact) => {
        set(() => ({
            contact: contact,
            loading: false
        }))
    },


    fetchContact: (id) => {
        get().setLoading(true)
        axios.get(process.env.REACT_APP_BACKEND_URL + `/api/user/${id}`).then((response) => {
            set(() => ({
                contact: response.data,
                loading: false
            }))
        }).catch((err) => {
            // todo: Handle Err
        })
    },

    createContact: (id) => {
        const params = {
            contact_user_id: id
        }
        axios.post(process.env.REACT_APP_BACKEND_URL + `/api/contact`, params).then((response) => {
            get().fetchContacts()
        }).catch((err) => {
            // todo: check keys
            // todo: посмотреть как выглядят ошибки
        })
    }
}))