import {Chat, ChatTypes} from "../models/Chat";

export const SingleChatController = {
    async getItemByUsers(users: number[]): Promise<Chat | undefined> {
        let res = await new Chat().getListByUsers(users);
        let chat = res.find((chat) => {
            return chat.type === ChatTypes.single;
        });
        await chat?.getMessages();
        await chat?.getUsers()
        return chat;
    },

    async createItemByUsers(users: string[]): Promise<Chat | undefined> {
        let chat = new Chat();
        chat.type = ChatTypes.single;
        chat = await chat.create(Chat) as Chat;
        for (const user of users) {
            await chat.addUser(user);
        }
        await chat.getUsers();
        return chat;
    }
}