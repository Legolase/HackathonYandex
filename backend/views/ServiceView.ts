import {Router} from "express";
import {User} from "../models/User";
import {ContactController} from "../controllers/ContactController";
import {s3} from "../index";
import {ServiceController} from "../controllers/ServiceController";

export const ServiceView: Router = Router();


ServiceView.post('/service/upload_file', async (req, res) => {
        // #swagger.description = 'Загрузка файла'
        // #swagger.tags = ['Service']
        /* #swagger.responses[200] = {
            description: 'Файл загружен',
            schema: [
                {
                    link: 'url to file in s3',
                    name: 'original name'
                }
            ]
        } */
        /* #swagger.responses[400] = {
            description: 'Файл не отправлен'
        } */
        /* #swagger.responses[401] = {
            description: 'Пользователь не авторизован'
        } */
        let file = null;
        if (req.files) {
            file = Array.isArray(req.files.value) ? req.files.value[0] : req.files.value;
        }
        console.log(req.files);
        if (!file) {
            res.status(400);
            res.json({
                type: 'error',
                error: 'Error: not send a file!'
            })
            return;
        }
        ServiceController.uploadFile(file).then(data => res.json(data));
    }
);