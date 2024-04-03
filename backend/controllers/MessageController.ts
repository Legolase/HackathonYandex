import {Message} from "../models/Message";

export const MessageController = {
    async getList() {
        let messages;
        await new Message().getList().then(data => {
            messages = data
        });
        return messages;
    },
}