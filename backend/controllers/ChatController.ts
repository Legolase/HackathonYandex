import {Chat} from "../models/Chat";
import {User} from "../models/User";

export const ChatController = {
    async getList(user: User) {
        if (!user.id) return [];
        return await new Chat().getListByUsers(user.id);
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