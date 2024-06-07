import {Router} from "express";
import {ChatController} from "../controllers/ChatController";
import {User} from "../models/User";

export const ChatView: Router = Router();


ChatView.get('/chat', async (req, res) => {
        // #swagger.description = 'Получение списка чатов'
        // #swagger.tags = ['Chat']
        /* #swagger.responses[200] = {
            description: 'Получен список чатов',
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
        let user = await req.user;
        // TODO: CHANGE TYPE!!!
        ChatController.getList(user as User).then(data => res.json(data));
    }
);
ChatView.get('/chat/:id', async (req, res) => {
        // #swagger.description = 'Получение чата'
        // #swagger.tags = ['Chat']
        /* #swagger.parameters['id'] = {
            in: 'query',
            description: 'ID чата',
            type: 'number'
        } */
        /* #swagger.responses[200] = {
            description: 'Получен чат',
            schema: {
              "id": 1,
              "type": "single",
              "pin_message": null,
              "name": "test",
              "avatar": null,
              "messages": [
                {
                  "id": 1,
                  "datetime": "2024-04-10T02:09:09.151Z",
                  "text": "Message 1",
                  "from": 1,
                  "read": false
                },
                {
                  "id": 3,
                  "datetime": "2024-04-10T02:09:40.322Z",
                  "text": "Message 2",
                  "from": 10,
                  "read": true
                }
              ],
              "users": {
                "1": {
                  "id": 1,
                  "datetime_last_activity": "2024-04-03T08:05:58.011Z",
                  "name": "test",
                  "login": "test",
                  "email": null,
                  "avatar": null,
                  "github_id": null
                }
              }
            }
        } */
        /* #swagger.responses[401] = {
            description: 'Пользователь не авторизован'
        } */
        /* #swagger.responses[403] = {
            description: 'У пользователя нет доступа к чату'
        } */
        ChatController.getItem(req.params.id).then(data => res.json(data))
    }
);

ChatView.post('/chat', async (req, res) => {
    // #swagger.description = 'Создание чата'
    // #swagger.tags = ['Chat']
    /*
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Тело запроса',
        required: true,
        schema: {
                type: 'single|multi|channel',
                name: 'Название чата',
                users: [1, 2]
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
    ChatController.createItem(req.body)
        .then((data) => res.json(data))
        .catch((error) => {
            res.status(400);
            res.json({
                type: 'error',
                error: error.message
            })
        });
});

ChatView.post('/chat/:id/exit', async (req, res) => {
    // #swagger.description = 'Выход из чата'
    // #swagger.tags = ['Chat']
    /*
    #swagger.responses[401] = {
        description: 'Пользователь не авторизован'
    }
    */
    /*
    #swagger.responses[403] = {
        description: 'Вас нет в этом чате'
    }
    */
    let user = await req.user as User;
    ChatController.deleteUser(req.params.id, user.id)
        .then((data) => res.json(data))
        .catch((error) => {
            res.status(403);
            res.json({
                type: 'error',
                error: error.message
            })
        });
});

ChatView.post('/chat/:id/invite', async (req, res) => {
    // #swagger.description = 'Приглашение в чат'
    // #swagger.tags = ['Chat']
    /* #swagger.responses[200] = {
        description: 'Получен чат',
        schema: {
          "id": 1,
          "type": "single",
          "pin_message": null,
          "name": "test",
          "avatar": null,
          "messages": [
            {
              "id": 1,
              "datetime": "2024-04-10T02:09:09.151Z",
              "text": "Message 1",
              "from": 1,
              "read": false
            },
            {
              "id": 3,
              "datetime": "2024-04-10T02:09:40.322Z",
              "text": "Message 2",
              "from": 10,
              "read": true
            }
          ],
          "users": {
            "1": {
              "id": 1,
              "datetime_last_activity": "2024-04-03T08:05:58.011Z",
              "name": "test",
              "login": "test",
              "email": null,
              "avatar": null,
              "github_id": null
            }
          }
        }
    } */
    /*
    #swagger.responses[401] = {
        description: 'Пользователь не авторизован'
    }
    */
    let user = await req.user as User;
    if (user.id)
        ChatController.inviteUser(req.params.id, user.id)
            .then((data) => res.json(data))
});
