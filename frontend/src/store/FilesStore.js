import {create} from "zustand";
import axios from "axios";

export const useFilesStore = create((set, get) => ({

    files: [],
    activeBackground: false,


    saveFile : (file) =>{
        return axios.post('/api/service/upload_file', {value: file}, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
    },

    setActiveBackground: (active) => {
        set(() => ({
            activeBackground: active
        }))
    },

    addFiles: (newFiles) => {
        set(() => ({
            files: [...get().files, ...newFiles]
        }))
    },

    nulifyFiles: () => {
        set(() => ({
            files: []
        }))
    }

}))