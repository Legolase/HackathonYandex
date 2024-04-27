import {Chat} from "../models/Chat";
import {ChatTypes} from "../models/Chat";

export const SingleChatController = {
    async getItemByUser(users: number[]) {
        let res = await new Chat().getListByUsers(users);
        let chat = res.find((chat) => {
            return chat.type === ChatTypes.single;
        });
        await chat?.getMessages();
        await chat?.getUsers()
        return chat;
    }
}