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
        return {
            datetime_last_activity: this.datetime_last_activity?.toISOString(),
            name: this.name,
            login: this.login,
            email: this.email,
            avatar: this.avatar,
            github_id: this.github_id
        };
    }
}