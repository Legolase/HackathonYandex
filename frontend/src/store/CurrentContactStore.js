import {create} from "zustand";
import axios from "axios";

export const useCurrentContactStore = create((set, get) => ({

    contact: null,
    error: null,
    loading: false,

    // ----------------------------------------------------
    // -------------------THIS FOR TESTING-----------------
    // ----------------------------------------------------
    //  {
    //                 "id": 15,
    //                 "datetime_create": "2024-04-13T11:00:17.197Z",
    //                 "datetime_last_activity": "2024-04-13T08:00:17.196Z",
    //                 "name": "IlyaStepanov1104",
    //                 "login": "IlyaStepanov1104",
    //                 "email": "ilyahtml@gmail.com",
    //                 "avatar": "storage\\image\\avatar\\bf1f5bf9a2a23aaa37c9ec809f3f706c.jpeg",
    //                 "github_id": 102037915
    //             }
    // ----------------------------------------------------
    // ----------------------------------------------------
    // ----------------------------------------------------

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
        axios.get(`/api/user/${id}`).then((response) => {
            // todo: Check response code
            set(() => ({
                contact: response.data
            }))
        }).catch((err) => {
            // todo: Handle Err
        })
    }
}))