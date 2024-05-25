import {create} from "zustand";
import axios from "axios";

export const useContactsStore = create((set, get) => ({

    contacts: [],
    loading: false,
    error: null,

    setLoading: (loading) => {
        set(() => ({
                loading: loading
            }
        ))
    },

    fetchContacts: function () {
        get().setLoading(true)
        axios.get(process.env.REACT_APP_BACKEND_URL + '/api/contact').then((response) => {
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