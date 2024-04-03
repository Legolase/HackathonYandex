import {Router} from "express";
import {MessageController} from "../controllers/MessageController";

export const MessageView: Router = Router();

MessageView.get('/message', (req, res) => {
        MessageController.getList().then(data => res.json(data));
    }
);