import {create} from "zustand";
import axios from "axios";

export const useCurrentContactStore = create((set, get) => ({

    contact: null,
    error: null,
    loading: true,
    active: false,


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
        axios.get(process.env.REACT_APP_BACKEND_URL + `/api/user/${id}`).then((response) => {
            // todo: Check response code
            set(() => ({
                contact: response.data,
                loading: false
            }))
        }).catch((err) => {
            // todo: Handle Err
        })
    }
}))