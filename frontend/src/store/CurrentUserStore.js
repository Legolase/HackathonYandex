import {create} from "zustand";
import axios from "axios";


export const useCurrentUserStore = create((set) => ({

    currentUser: null,
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
                    currentUser: response.data.user,

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