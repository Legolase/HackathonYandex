import {create} from "zustand";
import axios from "axios";

export const useCurrentContactStore = create((set, get) => ({

    contact: null,
    error: null,
    loading: false,


    nullifyContact: () => {
        set(() => ({
            contact: null
        }))
    },

    setContact: (contact) => {
        set(() => ({
            contact: contact
        }))
    },


    fetchContact: (id) => {
        axios.get(process.env.REACT_APP_BACKEND_URL + `/api/user/${id}`).then((response) => {
            // todo: Check response code
            set(() => ({
                contact: response.data
            }))
        }).catch((err) => {
            // todo: Handle Err
        })
    }
}))