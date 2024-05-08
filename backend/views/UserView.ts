import {Router} from "express";
import {UserController} from "../controllers/UserController";
import {User} from "../models/User";

export const UserView: Router = Router();

UserView.get('/user', async (req, res) => {
        // #swagger.description = 'Получение списка пользователей'
        // #swagger.tags = ['User']
        /* #swagger.responses[200] = {
            description: 'Получен список пользователей',
            schema: [
      {
        "table": "users",
        "db": {

        },
        "id": 10,
        "datetime_create": "2024-04-03T08:28:46.810Z",
        "datetime_last_activity": "2024-04-03T08:28:46.810Z",
        "name": "kek",
        "login": "kek",
        "email": null,
        "avatar": null,
        "github_id": null
      },
      {
        "table": "users",
        "db": {

        },
        "id": 1,
        "datetime_create": "2024-04-03T08:05:58.011Z",
        "datetime_last_activity": "2024-04-03T08:05:58.011Z",
        "name": "test",
        "login": "test",
        "email": null,
        "avatar": null,
        "github_id": null
      },
      {
        "table": "users",
        "db": {

        },
        "id": 17,
        "datetime_create": "2024-04-13T12:21:42.576Z",
        "datetime_last_activity": "2024-04-13T09:21:42.575Z",
        "name": "IlyaStepanov1104",
        "login": "IlyaStepanov1104",
        "email": "ilyahtml@gmail.com",
        "avatar": "image\\avatar\\708d5e598f4ce68eab6b1c5bf9db85f6.jpeg",
        "github_id": 102037915
      }
    ]
        } */
        /* #swagger.responses[401] = {
            description: 'Пользователь не авторизован'
        } */
        let user = await req.user as User;
        await user.updateActivity();
        UserController.getList().then(data => res.json(data));
    }
);

UserView.get('/user/current', async (req, res) => {
        // #swagger.description = 'Получение текущего пользователя'
        // #swagger.tags = ['User']
        /* #swagger.responses[200] = {
            description: 'Получен пользователь',
            schema:
      {
        "table": "users",
        "db": {},
        "id": 17,
        "datetime_create": "2024-04-13T12:21:42.576Z",
        "datetime_last_activity": "2024-04-13T09:21:42.575Z",
        "name": "IlyaStepanov1104",
        "login": "IlyaStepanov1104",
        "email": "ilyahtml@gmail.com",
        "avatar": "image\\avatar\\708d5e598f4ce68eab6b1c5bf9db85f6.jpeg",
        "github_id": 102037915
      }
        } */
        /* #swagger.responses[401] = {
            description: 'Пользователь не авторизован'
        } */

        let user = await req.user as User;
        await user.updateActivity();
        res.json(user);
    }
);

UserView.get('/user/:id', async (req, res) => {
        // #swagger.description = 'Получение пользователя по id'
        // #swagger.tags = ['User']
        /* #swagger.responses[200] = {
            description: 'Получен пользователь',
            schema:
      {
        "table": "users",
        "db": {

        },
        "id": 17,
        "datetime_create": "2024-04-13T12:21:42.576Z",
        "datetime_last_activity": "2024-04-13T09:21:42.575Z",
        "name": "IlyaStepanov1104",
        "login": "IlyaStepanov1104",
        "email": "ilyahtml@gmail.com",
        "avatar": "image\\avatar\\708d5e598f4ce68eab6b1c5bf9db85f6.jpeg",
        "github_id": 102037915
      }
        } */
        /* #swagger.responses[401] = {
            description: 'Пользователь не авторизован'
        } */
        let user = await req.user as User;
        await user.updateActivity();
        UserController.getItem(req.params.id).then(data => res.json(data))
    }
);