import {create} from "zustand";
import files from "../components/Files/Files";

export const useFilesStore = create((set, get) => ({

    files: [],
    activeBackground: false,

    setActiveBackground: (active) => {
        set(() => ({
            activeBackground: active
        }))
    },

    addFiles: (newFiles) => {
        console.log(get().files)
        console.log(newFiles)
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