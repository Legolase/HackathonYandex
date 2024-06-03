import {create} from "zustand";
import axios from "axios";

export const useContactsStore = create((set, get) => ({

    contacts: [],
    loading: false,
    error: null,
    searchQuery: '',
    queriedContacts: [],
    queriedUsers: [],

    nulify: () => {
        set(() => ({
            queriedContacts: [],
            queriedUsers: [],
        }))
    },

    setQuery: (query) => {
        set(() => ({
            searchQuery: query
        }))
    },

    contactAndUserSearch: () => {
        axios.get('/api/contact/search', {
            params: {
                name: get().searchQuery
            }
        }).then((res1) => {
            axios.get('/api/user/search', {
                params: {
                    name: get().searchQuery
                }
            }).then((res2) => {
                set(() => ({
                    queriedContacts: res1.data
                }))
                const unique = new Set(res1.data.map((contact) => contact.id))
                const excluded = res2.data.filter((user) => !unique.has(user.id))
                set(() => ({
                    queriedUsers: excluded
                }))
            })
        }).catch((err) => {

        })
    },


    setLoading: (loading) => {
        set(() => ({
                loading: loading
            }
        ))
    },

    fetchContacts: function () {
        get().setLoading(true)
        axios.get('/api/contact').then((response) => {
            set(() => ({
                    contacts: [...response.data],
                    loading: false
                }
            ))
        }).catch((err) => {
            // todo: check Unauthorized
            set(() => ({
                    error: err,
                    loading: false,
                }
            ))
        })
    },


}))