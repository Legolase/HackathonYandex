import {Chat} from "../models/Chat";

export const ChatController = {
    async getList(user_id: string | undefined): Promise<Chat[]> {
        if (!user_id) return [];
        return await new Chat().getListByUsers(user_id);
    },

    getItem: async function (id: string) {
        let chat: Chat | undefined;
        await new Chat().getById(id, Chat).then(async data => {
            chat = data;
            if (chat) {
                await chat.getMessages();
                await chat.getUsers();
            }
        });
        return chat;
    },
}