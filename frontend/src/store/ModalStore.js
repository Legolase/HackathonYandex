import {create} from "zustand";

export const useModalStore = create((set, get) => ({

    active: false,

    setActive: (active) => {
        set(() => ({
            active: active
        }))
    }

}))