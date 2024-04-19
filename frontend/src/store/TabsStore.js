import {create} from "zustand";


export const useTabsStore = create((set, get) => ({

    active: 'Messages',
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

// window.store = useTabsStore