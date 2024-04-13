import {Router} from "express";
import {UserController} from "../controllers/UserController";
import {ChatController} from "../controllers/ChatController";
import {User} from "../models/User";

export const UserView: Router = Router();

UserView.get('/user', (req, res) => {
        UserController.getList().then(data => res.json(data));
    }
);

UserView.get('/user/current', async (req, res) => {
        let user = await req.user;
        // TODO: CHANGE TYPE!!!
        res.json(user);
    }
);

UserView.get('/user/:id', (req, res) => {
        UserController.getItem(req.params.id).then(data => res.json(data))
    }
);