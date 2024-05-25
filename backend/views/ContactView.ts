import {Router} from "express";
import {User} from "../models/User";
import {ContactController} from "../controllers/ContactController";

export const ContactView: Router = Router();


ContactView.get('/contact', async (req, res) => {
        // #swagger.description = 'Получение списка контактов'
        // #swagger.tags = ['Contact']
        /* #swagger.responses[200] = {
            description: 'Получен список контактов',
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
        let user = await req.user as User;
        await user.updateActivity();
        // TODO: CHANGE TYPE!!!
        req.body.user_id = user.id;
        ContactController.getList(user).then(data => res.json(data));
    }
);

ContactView.get('/contact/search', async (req, res) => {
        // #swagger.description = 'Получение списка контактов'
        // #swagger.tags = ['Contact']
        /* #swagger.responses[200] = {
            description: 'Получен список контактов',
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
        let user = await req.user as User;
        await user.updateActivity();
        // TODO: CHANGE TYPE!!!
        // @ts-ignore
        ContactController.searchByName(user.id, req.query.name).then(data => {
            res.json(data)
        });
    }
);

ContactView.post('/contact', async (req, res) => {
    // #swagger.description = 'Создание контакта'
    // #swagger.tags = ['Contact']
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
    let user = await req.user as User;
    await user.updateActivity();
    req.body.user_id = user.id;
    ContactController.createItem(req.body)
        .then((data) => res.json(data))
        .catch((error) => {
            res.status(400);
            res.json({
                type: 'error',
                error: error.message
            })
        });
})
;


