import {Router} from "express";
import {MessageController} from "../controllers/MessageController";

export const MessageView: Router = Router();

MessageView.get('/message', (req, res) => {

        // #swagger.description = 'Получение списка чатов'
        // #swagger.tags = ['Chats']
        /* #swagger.responses[200] = {
            description: 'Получен список чатов',
        /* #swagger.responses[401] = {
            description: 'Пользователь не авторизован'
        } */
        MessageController.getList().then(data => res.json(data));
    }
);
MessageView.get('/message/:id', (req, res) => {
        MessageController.getItem(req.params.id).then(data => res.json(data))
    }
);