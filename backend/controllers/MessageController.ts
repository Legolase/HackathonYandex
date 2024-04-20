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
        let message;
        await new Message().getById(id, Message).then(data => {
            message = data
        });
        return message;
    },

    async createItem(obj: Record<string, any>) {
        new Message().validate(obj);
        let message = new Message(obj);
        return await message.create(Message)
    }
}