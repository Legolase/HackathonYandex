import {Chat} from "../models/Chat";

export const ChatController = {
    async getList() {
        let chats;
        await new Chat().getList().then(data => {
            chats = data
        });
        return chats;
    },
}