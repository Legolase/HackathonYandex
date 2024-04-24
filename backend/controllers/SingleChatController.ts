import {Chat} from "../models/Chat";
import {User} from "../models/User";
import {ChatUser} from "../models/ChatUser";

export const SingleChatController = {
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


    async createItem(obj: Record<string, any>) {
        await new Chat().validate(obj);
        let chat = await new Chat(obj).create(Chat);
        if (chat === undefined) throw new Error('Can not create chat!');
        for (const user of obj.users) {
            let relation = new ChatUser();
            relation.chat_id = chat.id;
            relation.user_id = user;
            await relation.create(ChatUser);
        }
        await chat.getMessages();
        await chat.getUsers();
        return chat;
    }
}