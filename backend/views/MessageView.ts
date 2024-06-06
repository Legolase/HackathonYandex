import {Router} from "express";
import {MessageController} from "../controllers/MessageController";
import {User} from "../models/User";
import {s3} from "../index";

export const MessageView: Router = Router();

MessageView.get('/message', async (req, res) => {
        // #swagger.description = 'Получение списка сообщений'
        // #swagger.tags = ['Message']
        /* #swagger.responses[200] = {
            description: 'Получен список сообщений',
            schema: [
                      {
                        "table": "messages",
                        "db": { },
                        "id": 1,
                        "datetime": "2024-04-10T02:09:09.151Z",
                        "text": "Message 1",
                        "from": 1,
                        "read": false,
                        "chat_id": 1
                      },
                      {
                        "table": "messages",
                        "db": { },
                        "id": 3,
                        "datetime": "2024-04-10T02:09:40.322Z",
                        "text": "Message 2",
                        "from": 10,
                        "read": true,
                        "chat_id": 1
                      },
            ]
        } */
        /* #swagger.responses[401] = {
            description: 'Пользователь не авторизован'
        } */
        let user = await req.user as User;
        MessageController.getList().then(data => res.json(data));
    }
);
MessageView.get('/message/:id', async (req, res) => {
        // #swagger.description = 'Получение сообщения по id. Зачем, а главное зачем?'
        // #swagger.tags = ['Message']
        /* #swagger.responses[200] = {
            description: 'Получено сообщение',
            schema: {
                        "table": "messages",
                        "db": { },
                        "id": 1,
                        "datetime": "2024-04-10T02:09:09.151Z",
                        "text": "Message 1",
                        "from": 1,
                        "read": false,
                        "chat_id": 1
                      }
        } */
        /* #swagger.responses[401] = {
            description: 'Пользователь не авторизован'
        } */
        let user = await req.user as User;
        MessageController.getItem(req.params.id).then(data => res.json(data))
    }
);

MessageView.post('/message', async (req, res) => {
    // #swagger.description = 'Отправка сообщения'
    // #swagger.tags = ['Message']
    /*
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Тело запроса',
        required: true,
        schema: {
                type: 'text|image|video|document|resend',
                value: 'value of message',
                chat_id: 1
            }
    }
    */
    /*
    #swagger.responses[400] = {
        description: 'Некорректные данные запроса',
        schema: {
            type: 'error',
            error: 'error.message'
        }
    }
    */
    /*
    #swagger.responses[401] = {
        description: 'Пользователь не авторизован'
    }
    */
    let user = await req.user as User;
    await user.updateActivity();
    req.body.user_id = user.id;
    let obj = req.body;
    if(req.files) {
        obj.value = await s3.uploadFile(Array.isArray(req.files.value) ? req.files.value[0].data : req.files.value.data, '/uploads/');
        obj.value = obj.value.Location;
    }
    MessageController.createItem(obj)
        .then((data) => res.json(data))
        .catch((error) => {
            res.status(400);
            res.json({
                type: 'error',
                error: error.message
            })
        });
});