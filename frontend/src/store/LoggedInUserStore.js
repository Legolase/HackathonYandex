import {create} from "zustand";
import axios, {get} from "axios";


export const useLoggedInUserStore = create((set, get) => ({

    currentUser: null,
    loading: true,

    setLoading: (loading) => {
        set(() => ({
            loading: loading
        }))
    },


    getCurrentUser: () => {
        axios.get('/api/user/current').then((response) => {
            set(() => ({
                currentUser: response.data,
            }))
        }).catch((err) => {
        }).finally(() => {
            set(() => ({
                loading: false
            }))
        })
    },

    generateAvatar: (user) => {
        axios.get('/api/service/generate_image', {
            params: {
                uid: user.id
            }
        }).then(r => {
            axios.patch('/api/user', {
                avatar: r.data
            })
        }).catch(e => {
            console.log(e)
        })
    },

    changeName: (name) => {
        axios.patch('/api/user', {
            name: name
        }).catch(err => {
            console.log(err)
        })
    },

    changeAvatar: (avatar) => {
        axios.patch('/api/user', {
            avatar: avatar.link
        }).then(res => {
            set(()=>({
                currentUser: res.data
            }))
        }).catch(err => {
            console.log(err)
        })
    }

}))