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

ServiceView.get('/service/generate_image', async (req, res) => {
        // #swagger.description = 'Генерация изображения'
        // #swagger.tags = ['Service']
        /*#swagger.parameters['uid'] = {
            in: 'query',
            description: 'Строка для генерации',
            required: true,
            type: 'string
        }
        */
        /* #swagger.responses[200] = {
            description: 'Файл загружен',
            schema: [
                {
                    link: 'url to file in s3'
                }
            ]
        } */
        /* #swagger.responses[400] = {
            description: 'Нет параметра'
        } */
        /* #swagger.responses[401] = {
            description: 'Пользователь не авторизован'
        } */
        let uid = req.query.uid;
        if (!uid || typeof uid !== 'string') {
            res.status(400);
            res.json({
                type: 'error',
                error: 'Error: not send a uid!'
            })
            return;
        }
        ServiceController.generateImage(uid).then(data => res.json(data));
    }
);