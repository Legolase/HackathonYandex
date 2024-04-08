import {Chat} from "../models/Chat";

export const ChatController = {
    async getList() {
        let chats;
        await new Chat().getList().then(data => {
            chats = data
        });
        return chats;
    },
    getItem: async function (id: string) {
        let chat: Chat | undefined;
        await new Chat().getById(id).then(async data => {
            chat = data;
            if (chat) {
                await chat.getMessages();
            }
        });
        return chat;
    },
}