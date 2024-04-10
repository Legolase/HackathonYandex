import {User} from "../models/User";

export const UserController = {
    async getList() {
        let users;
        await new User().getList(User).then(data => {
            users = data
        });
        return users;
    },
    async getItem(id: string) {
        let chat;
        await new User().getById(id, User).then(data => {
            chat = data
        });
        return chat;
    },
}