import {Model} from "./Model";
import {DataValue} from "../types/DataValue";
import {Message} from "./Message";


enum ChatTypes {
    'single',
    'multi',
    'channel'
}

export class Chat extends Model {
    table: string = 'chats';

    async getMessages(): Promise<Message[] | undefined> {
        let data: Record<string, DataValue>[] | null = await this.db.selectAll('messages', {chat_id: `=${this.id}`});
        return data?.map((item: Record<string, DataValue>) => {
            return new Message(item);
        });
    }
}