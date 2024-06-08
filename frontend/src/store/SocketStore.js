import {create} from "zustand";

export const useSocketStore = create((set, get) => ({

    socket: null,

    setSocket: (socket) => {
        set(() => ({
            socket: socket
        }))
    }

}))