import {Router} from "express";
import {ChatController} from "../controllers/ChatController";
import {User} from "../models/User";

export const ChatView: Router = Router();


ChatView.get('/chat', async (req, res) => {
        // #swagger.description = 'Получение списка чатов'
        // #swagger.tags = ['Chats']
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
ChatView.get('/chat/:id', (req, res) => {
        // #swagger.description = 'Получение чата'
        // #swagger.tags = ['Chats']
        /* #swagger.parameters['id'] = {
            in: 'query',
            description: 'ID чата',
            type: 'int'
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