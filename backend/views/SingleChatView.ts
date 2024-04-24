import {Router} from "express";
import {ChatController} from "../controllers/ChatController";
import {User} from "../models/User";

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
        res.status(404);
        res.json({error: "ERROR: Not found entity!!"})
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
    /*
    #swagger.responses[401] = {
        description: 'Пользователь не авторизован'
    }
    */
    /*
    #swagger.responses[418] = {
        description: 'Я — чайник'
    }
    */
    res.status(418);
    res.json({error: "ERROR: Not found entity!!"})
})
;
