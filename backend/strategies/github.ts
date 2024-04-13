import passportGithub from "passport-github";
import {User} from "../models/User";
import fs from "fs";
import https from "https";
import crypto from "crypto";
import path from "path";

const generateFileName = () => {
    const currentTime = new Date().getTime().toString(); // Получаем текущее время в миллисекундах и преобразуем в строку
    const hash = crypto.createHash('md5').update(currentTime).digest('hex'); // Создаем MD5 хеш от строки текущего времени
    return `${hash}.jpeg`; // Возвращаем имя файла с расширением .jpeg
};

export const githubStrategy = new passportGithub.Strategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID || '',
        clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
        // Адрес, на который пользователь будет возвращён после авторизации в GitHub
        callbackURL: 'http://127.0.0.1:8000/auth/github/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        let name = profile.name?.givenName||profile.username||'';
        let githubId = profile.id;
        let login = profile.username ? profile.username : '';
        let email = profile.emails ? profile.emails[0].value : '';
        let photo = profile.photos ? profile.photos[0].value : '';
        const fileName = generateFileName(); // Генерируем уникальное имя файла
        const filePath = path.join('storage', 'image', 'avatar', fileName); // Полный путь к файлу
        if (!photo) {
            const file = fs.createWriteStream(filePath);
            https.get(photo, response => {
                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                });
            }).on('error', err => {
                fs.unlink(filePath, () => {
                }); // Удаляем файл, если произошла ошибка
                console.error(err);
            });
        }
        let user = await new User().getOne(User, {github_id: `= ${githubId}`});
        if (!user) {
            user = new User();
            user.datetime_last_activity = new Date();
            user.name = name;
            user.github_id = githubId;
            user.login = login;
            user.email = email;
            user.avatar = filePath;
            user = await user.create(User);
        }
        if (!user){
            done(null, false);
            return;
        }
        done(null, user);
    }
);

module.exports = {githubStrategy}