import {Chat} from "../models/Chat";

export const ChatController = {
    async getList(user_id: string | undefined) {
        // if (!user_id) return [];
        // return await new Chat().getListByUsers(user_id);
        let chats;
        chats = await new Chat().getList(Chat);
        if (!chats) return [];
        return await Promise.all(chats.map(async (chat: Chat) => {
            await chat.getLastMessages();
            return chat;
        }));
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