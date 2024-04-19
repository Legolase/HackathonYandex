import {create} from "zustand";


export const useRightPanelStore = create((set, get) => ({

    active: null,


    setActive: (active) => {
        set(() => ({
            active: active
        }))
    }



}))