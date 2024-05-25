import {create} from "zustand";
import files from "../components/Files/Files";
import axios from "axios";

export const useFilesStore = create((set, get) => ({

    files: [],
    activeBackground: false,


    saveFile : (file) =>{
        console.log(file.name)
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