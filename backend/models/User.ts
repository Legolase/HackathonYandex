import {Model} from "./Model";

export class User extends Model {
    table: string = 'users';
    datetime_last_activity: Date | undefined;
    name: string | undefined;
    login: string | undefined;
    email: string | undefined;
    avatar: string | undefined;
    github_id: string | undefined;

    getObject(): object {
        const isoString = this.datetime_last_activity?.toISOString();
        const datePart = isoString?.substring(0, 10); // YYYY-MM-DD
        const timePart = isoString?.substring(11, 23); // HH:MI:SS.MS

        return {
            id: this.id,
            datetime_last_activity: isoString ? `${datePart} ${timePart}` : undefined,
            name: this.name,
            login: this.login,
            email: this.email,
            avatar: this.avatar,
            github_id: this.github_id
        };
    }

    async validate(obj: Record<string, any>): Promise<boolean> {
        return true;
    }

    async updateActivity() {
        this.datetime_last_activity = new Date();
        await this.update(User);
    }

    async searchByName(name: string) {
        let users = await this.db.selectAll(this.table, ['name ILIKE \'%\' || $1 || \'%\' OR login ILIKE \'%\' || $1 || \'%\'', [name]]);
        return users.map((item) => {
            return new User(item)
        });
    }
}