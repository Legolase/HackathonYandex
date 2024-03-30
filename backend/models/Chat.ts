import {User} from "./User";
import {Message} from "./Message";


enum ChatTypes {
    'single',
    'multi',
    'channel'
}

export class Chat {
    id: number = 0
    datetime: string = '';
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