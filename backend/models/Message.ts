import {Model} from "./Model";
import {User} from "./User";

enum MessageType {
    'info', 'text', 'image', 'video', 'link', 'document', 'resend'
}

export class Message extends Model {
    table: string = 'messages';
    user_id: User | undefined;
    datetime: Date | undefined;
    type: MessageType | undefined;
    value: string | undefined;
    read: boolean | undefined;
    chat_id: number | undefined;

    validate(obj: Record<string, any>): [boolean, string] {
        if (typeof obj.type !== 'string' || !Object.values(MessageType).includes(obj.type as string)) throw new Error('ERROR: field "type" must be string in enum');
        if (typeof obj.value !== 'string' || obj.value.trim() === '') throw new Error('ERROR: field "value" must be not null string!');
        if (typeof obj.chat_id !== 'number' || !Number.isInteger(obj.chat_id)) throw new Error('ERROR: field "chat_id" must be not null number!');
        return [true, 'Correct object!'];
    }

    getObject(): object {
        return {
            user: this.user_id,
            datetime: this.datetime,
            type: this.type,
            value: this.value,
            read: this.read,
            chat_id: this.chat_id,
        };
    }
}