import {Model} from "./Model";
import {User} from "./User";
import {ChatTypes} from "./Chat";

export class Contact extends Model {
    table: string = 'contacts';
    user_id: string | undefined;
    contact_user_id: string | undefined;
    contact_user: User | undefined;

    getObject(): object {
        return {
            id: this.id,
            user_id: this.user_id,
            contact_user_id: this.contact_user_id
        };
    }

    async validate(obj: Record<string, any>): Promise<boolean> {
        if (typeof obj.user_id !== 'string' || obj.user_id.length === 0) throw new Error('ERROR: field "user_id" must be not empty uid!');
        if (typeof obj.contact_user_id !== 'string' || obj.contact_user_id.length === 0) throw new Error('ERROR: field "contact_user_id" must be not empty uid!');
        return true;
    }

    async loadUser() {
        if (this.contact_user_id) {
            this.contact_user = await new User().getById(this.contact_user_id, User);
        }
    }

    async searchByName(id: string, name: string) {
        let contacts = await this.db.join('u.*', 'users u', 'contacts c', 'u.id = c.contact_user_id',
            ['c.user_id = $1 AND (u.name ILIKE \'%\' || $2 || \'%\' OR u.login ILIKE \'%\' || $2 || \'%\')', [id, name]]);
        return contacts.map((item) => new User(item));
    }
}