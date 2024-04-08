import {Router} from "express";
import {UserController} from "../controllers/UserController";

export const UserView: Router = Router();

UserView.get('/user', (req, res) => {
        UserController.getList().then(data => res.json(data));
    }
);
UserView.get('/user/:id', (req, res) => {
        UserController.getItem(req.params.id).then(data => res.json(data))
    }
);