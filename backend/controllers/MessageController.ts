import {Message} from "../models/Message";

export const MessageController = {
    async getList() {
        let messages;
        await new Message().getList().then(data => {
            messages = data
        });
        return messages;
    },
    async getItem(id: string) {
        let chat;
        await new Message().getById(id).then(data => {
            chat = data
        });
        return chat;
    },
}