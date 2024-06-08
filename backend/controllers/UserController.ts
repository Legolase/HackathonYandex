import {User} from "../models/User";
import {DataValue} from "../types/DataValue";

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
    async searchByName(name: string) {
        return await new User().searchByName(name);
    },
    async editItem(user: User, obj: Record<keyof User, DataValue>) {
        Object.assign(user, obj);
        let new_user = await user.update(User);
        if (!new_user) throw new Error('Error: Can not save user!')
        return new_user;
    }
}