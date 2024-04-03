import {Router} from "express";
import {ChatController} from "../controllers/ChatController";

export const ChatView: Router = Router();

ChatView.get('/chat', (req, res) => {
        ChatController.getList().then(data => res.json(data));
    }
);
ChatView.get('/chat/:id', (req, res) => {
        // res.json(ChatController.getItem(req.params.id));
    }
);