import {Chat} from "../models/Chat";
import {User} from "../models/User";
import {ChatUser} from "../models/ChatUser";
import {Identicon} from "../facades/Identicon";
import {v4 as uuidv4} from "uuid";
import {s3} from "../index";

export const ChatController = {
    async getList(user: User) {
        if (!user.id) return [];
        return await new Chat().getListByUser(user.id);
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


    async createItem(obj: Record<string, any>) {
        await new Chat().validate(obj);
        let chat = await new Chat(obj).create(Chat);
        if (chat === undefined) throw new Error('Can not create chat!');
        if (!chat.avatar) {
            let fileBuffer = Identicon.generateImage(chat.id || uuidv4());
            let filePath = await s3.uploadFile(fileBuffer, '/chat_avatar/');
            chat.avatar = filePath?.Location;
            chat.update(Chat);
        }
        for (const user of obj.users) {
            let relation = new ChatUser();
            relation.chat_id = chat.id;
            relation.user_id = user;
            await relation.create(ChatUser);
        }
        await chat.getMessages();
        await chat.getUsers();
        return chat;
    },

    async deleteUser(chat_id: string, user_id: string|undefined) {
        let relation = await new ChatUser().getOne(ChatUser, {chat_id: chat_id, user_id: user_id});
        if (!relation) {
            throw new Error('Error: You not invite in this chat!');
        }
        await relation.delete();
    },
    async inviteUser(chat_id: string, user_id: string) {
        let relation = await new ChatUser().getOne(ChatUser, {chat_id: chat_id, user_id: user_id});
        let chat = await new Chat().getById(chat_id, Chat);
        if (!relation) {
            await chat?.addUser(user_id);
        }
        return chat;
    }
}