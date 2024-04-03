import {Model} from "./Model";


enum ChatTypes {
    'single',
    'multi',
    'channel'
}

export class Chat extends Model {
    table: string = 'chats';
}