import {Router} from "express";
import {User} from "../models/User";
import {SingleChatController} from "../controllers/SingleChatController";

export const SingleChatView: Router = Router();


SingleChatView.get('/single_chat', async (req, res) => {
        // #swagger.description = 'Получение личного чата'
        // #swagger.tags = ['Single Chat']
        /*
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Тело запроса',
            required: true,
            schema: {
                    user: 1
                }
        }
        */
        /* #swagger.responses[200] = {
            description: 'Получен чат',
            schema: [
              {
                "id": 1,
                "type": "single",
                "pin_message": null,
                "name": "test",
                "avatar": null,
                "messages": [
                  {
                    "id": 3,
                    "datetime": "2024-04-10T02:09:40.322Z",
                    "text": "Message 2",
                    "from": 10,
                    "read": true
                  }
                ]
              }
            ]
        } */
        /* #swagger.responses[401] = {
            description: 'Пользователь не авторизован'
        } */
        /* #swagger.responses[404] = {
            description: 'Сущности не существует'
        } */
        let user = await req.user as User;
        // @ts-ignore
        let result = await SingleChatController.getItemByUsers([+req.query.user, user.id]);
        if (result === undefined) {
            res.status(404);
            res.json({type: "error", "message": "Can not find entity!"});
        } else {
            res.json(result);
        }
    }
);

SingleChatView.post('/single_chat', async (req, res) => {
    // #swagger.description = 'Создание  личного чата'
    // #swagger.tags = ['Single Chat']
    /*
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Тело запроса',
        required: true,
        schema: {
                user: 1
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
    /* #swagger.responses[201] = {
        description: 'Создан чат',
        schema: [
          {
            "id": 1,
            "type": "single",
            "pin_message": null,
            "name": "test",
            "avatar": null,
            "messages": [],
            users: []
          }
        ]
    } */
    /*
    #swagger.responses[401] = {
        description: 'Пользователь не авторизован'
    }
    */
    /*
    #swagger.responses[409] = {
        description: 'Сущность уже существует'
    }
    */
    let user = await req.user as User;
    let search = await SingleChatController.getItemByUsers([req.body.user, user.id]);
    if (search !== undefined) {
        res.status(409);
        res.json({type: "error", "message": "Entity already exist!"});
        return;
    }
    await SingleChatController.createItemByUsers([req.body.user, user.id]).then(data => {
        res.status(201);
        res.json(data)
    });
});
