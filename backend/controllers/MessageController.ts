import {Message} from "../models/Message";

export const MessageController = {
    async getList() {
        let messages;
        await new Message().getList(Message).then(data => {
            messages = data
        });
        return messages;
    },
    async getItem(id: string) {
        let chat;
        await new Message().getById(id, Message).then(data => {
            chat = data
        });
        return chat;
    },
}