import {Router} from "express";
import {ChatController} from "../controllers/ChatController";

export const ChatView: Router = Router();

ChatView.get('/chat', (req, res) => {
        ChatController.getList(req.query.user?.toString()).then(data => res.json(data));
    }
);
ChatView.get('/chat/:id', (req, res) => {
        ChatController.getItem(req.params.id).then(data => res.json(data))
    }
);