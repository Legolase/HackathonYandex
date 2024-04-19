import {create} from "zustand";
import axios from "axios";


export const useLoggedInUserStore = create((set) => ({

    currentUser: {},
    loading: true,

    setLoading: (loading) => {
        set(() => ({
            loading: loading
        }))
    },


    getCurrentUser: () => {
        axios.get('/api/user/current').then((response) => {
            if (response.status === 200) {
                set(() => ({
                    currentUser: response.data,

                }))
            }
        }).catch((err) => {
        }).finally(() => {
            set(() => ({
                loading: false
            }))
        })
    }
}))