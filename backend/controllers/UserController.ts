import {User} from "../models/User";

export const UserController = {
    async getList() {
        let users;
        await new User().getList().then(data => {
            users = data
        });
        return users;
    },
}