import {create} from "zustand";


export const useNavStore = create((set, get) => ({

    active: 'allChats',
    error : null,
    loading: false,

    setLoading: (loading) =>{
        set(() => ({
            loading: loading
        }))
    },

    setError: (error) =>{
        set(() => ({
            error: error
        }))
    },

    setActive: (active) => {
        set(() => ({
            active: active
        }))
    }
}))
