import {Chat} from "../models/Chat";
import {User} from "../models/User";
import {ChatUser} from "../models/ChatUser";
import {Contact} from "../models/Contact";
import {DataValue} from "../types/DataValue";
import {db} from "../index";

export const ContactController = {
    async getList(user: User) {
        if (!user.id) return [];
        let contacts = await new Contact().getList(Contact, {user_id: user.id});
        if (contacts)
            return await Promise.all(contacts.map(async (item) => {
                    await item.loadUser();
                    return item;
                }
            ));
    },

    async createItem(obj: Record<string, any>) {
        await new Contact().validate(obj);
        let contact = await new Contact(obj).create(Contact);
        if (contact === undefined) throw new Error('Can not create contact!');
        await contact.loadUser();
        return contact;
    },

    async searchByName(id: string, name: string) {
        return await new Contact().searchByName(id, name);
    }
}