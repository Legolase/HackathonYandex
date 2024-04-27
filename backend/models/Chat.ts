import {Model} from "./Model";
import {DataValue} from "../types/DataValue";
import {Message} from "./Message";
import {db} from "../index";
import {User} from "./User";
import * as console from "console";


export enum ChatTypes {
    single = 'single',
    multi = 'multi',
    channel = 'channel'
}

export class Chat extends Model {
    table: string = 'chats';
    messages: Message[] | undefined = [];
    users: Record<string, User> | undefined = {};
    type: ChatTypes | undefined;
    pin_message: Message | undefined;
    name: string | undefined;
    avatar: string | undefined;


    async getMessages(): Promise<void> {
        this.messages = await new Message().getList(Message, {chat_id: `=${this.id}`});
    }

    async getLastMessages(): Promise<void> {
        let messages = await new Message().getOne(Message, {chat_id: `= ${this.id}`, order: 'datetime DESC'});
        if (messages) this.messages = [messages];
    }

    async getUsers(): Promise<void> {
        try {
            let query = `SELECT u.*
                         FROM chats_users cu
                                  JOIN users u ON cu.user_id = u.id
                         WHERE cu.chat_id = ${this.id}`;
            let users = await db.any(query);
            let map = new Map();
            for (let user of users) {
                if (user.id) {
                    map.set(user.id, user);
                }
            }
            this.users = Object.fromEntries(map);
        } catch (e) {
            console.error(e);
        }
    }

    async getListByUser(user_id: number): Promise<Chat[]> {
        try {
            let query = 'SELECT c.* FROM chats_users cu JOIN chats c ON cu.chat_id = c.id WHERE cu.user_id = $1';
            let chats = await db.any(query, user_id);

            return await Promise.all(chats.map(async (item: Record<string, DataValue>) => {
                let chat = new Chat(item);
                await chat.getLastMessages();
                return chat;
            }));
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    async getListByUsers(users: number[]): Promise<Chat[]> {
        try {
            let query = 'SELECT c.* FROM chats_users cu1 JOIN chats_users cu2 ON cu1.chat_id = cu2.chat_id JOIN chats c ON cu1.chat_id = c.id WHERE cu1.user_id = $1 AND EXISTS ( SELECT 1 FROM chats_users WHERE chat_id = cu1.chat_id AND user_id = $2) GROUP BY c.id;';
            let chats = await db.any(query, users);

            return await Promise.all(chats.map(async (item: Record<string, DataValue>) => {
                let chat = new Chat(item);
                await chat.getLastMessages();
                return chat;
            }));
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    getObject(): object {
        return {
            type: this.type,
            pin_message: this.pin_message,
            name: this.name,
            avatar: this.avatar,
        };
    }

    async validate(obj: Record<string, any>): Promise<boolean> {
        if (typeof obj.type !== 'string' || !(obj.type in ChatTypes)) throw new Error('ERROR: field "type" must be string in enum');
        if (typeof obj.users !== 'object' || obj.users.length == 0) throw new Error('ERROR: field "users" must be not empty array!');
        for (const user_id of obj.users) {
            await new User().getById(user_id, User).then(user => {
                if (user === undefined) {
                    throw new Error(`ERROR: can not find user with id = ${user_id}!`)
                }
            });
        }
        return true;
    }
}