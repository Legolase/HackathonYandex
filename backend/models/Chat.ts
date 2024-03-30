import {User} from "./User";
import {Message} from "./Message";
import {Model} from "./Model";

enum ChatTypes {
    'single',
    'multi',
    'channel'
}

export class Chat extends Model{
    messages: Array<Message> = [];
    type: ChatTypes = ChatTypes.single;
    users: Array<User> = [];
    pin_message: Message | null = null;

    static getList: () => Array<Chat> = () => {
        return [];
    };

    getById = (id: number) : Chat => {
        return new Chat();
    }
}