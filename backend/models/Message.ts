import {Model} from "./Model";
import {User} from "./User";

export class Message extends Model{
    table:string = 'messages';
    from: User|undefined;
    datetime: Date|undefined;
    text: string|undefined;
    read: boolean|undefined;
    chat_id: number|undefined;

    getObject(): object {
        return {
            from: this.from,
            datetime: this.datetime,
            text: this.text,
            read: this.read,
            chat_id: this.chat_id,
        };
    }
}