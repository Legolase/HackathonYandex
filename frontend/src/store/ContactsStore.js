import {create} from "zustand";
import axios from "axios";

export const useContactsStore = create((set, get) => ({

    contacts: [],
    loading: false,
    error: null,
    searchQuery: '',
    queriedContact: [],
    queriedUsers: [],

    nulify: () => {
        set(() => ({
            queriedContact: [],
            queriedUsers: [],
        }))
    },

    setQuery: (query) => {
        set(() => ({
            searchQuery: query
        }))
    },

    contactSearch: () => {
        axios.get('/api/contact/search', {
            params: {
                name: get().searchQuery
            }
        }).then((res) => {
            // todo: засетить пользователей
        })
    },

    userSearch: () => {
        axios.get('/api/user/search', {
            params: {
                name: get().searchQuery
            }
        }).then((res) => {
            // todo: добавить пользователей пользователей
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