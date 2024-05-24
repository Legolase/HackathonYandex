import {Model} from "./Model";

export class ChatUser extends Model {
    table: string = 'chats_users';
    chat_id: string | undefined;
    user_id: string | undefined;

    getObject(): object {
        return {
            id: this.id,
            chat_id: this.chat_id,
            user_id: this.user_id
        };
    }

    validate(obj: Record<string, any>): Promise<boolean> {
        return Promise.resolve(false);
    }
}