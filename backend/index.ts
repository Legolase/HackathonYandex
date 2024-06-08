import swaggerDocument from "./swagger-output.json";
import swaggerUi from "swagger-ui-express";
import express from 'express';
import {ChatView} from "./views/ChatView";
import 'dotenv/config'
import {UserView} from "./views/UserView";
import {MessageView} from "./views/MessageView";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import {myPassport} from "./myPassport";
import {AuthView} from "./views/AuthView";
import {isAuthenticatedMiddleware} from "./middlewares/isAuthenticatedMiddleware";
import path from "path";
import bodyParser from "body-parser";
import {SingleChatView} from "./views/SingleChatView";
import {S3} from "./facades/S3";
import {Server} from "socket.io";
import * as http from "http";
import {MessageController} from "./controllers/MessageController";
import fileUpload from "express-fileupload";
import {ParamsDictionary} from "express-serve-static-core";
import {ParsedQs} from "qs";
import {ContactView} from "./views/ContactView";
import {ServiceView} from "./views/ServiceView";
import notifier from "node-notifier";
import {ChatUser} from "./models/ChatUser";

const pgp = require('pg-promise')();
const PORT: string = process.env.PORT || '3000'
const SERVER_URL: string = process.env.URL || 'localhost'
const PROTOCOL: string = process.env.PROTOCOL || 'http'


const app = express();
const server = http.createServer(app);
const io = new Server(server);
export const s3 = new S3(process.env.accessKeyId, process.env.secretAccessKey, process.env.Bucket);
export const db = pgp(process.env.DATABASE_URL);

app.use(cookieParser());
app.use(bodyParser.json());

const sessionMiddleware = expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET || '',
    resave: false,
    saveUninitialized: false,
});

app.use(sessionMiddleware);

app.use(myPassport.initialize());
app.use(myPassport.session());

app.use(fileUpload({
    defCharset: 'utf8',
    defParamCharset: 'utf8'
}));

app.use(express.static('../frontend/build'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', AuthView);
app.use('/api', isAuthenticatedMiddleware, SingleChatView, ChatView, UserView, MessageView, ContactView, ServiceView);
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

function onlyForHandshake(middleware: express.RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>>) {
    return (req: any, res: any, next: any) => {
        const isHandshake = req._query.sid === undefined;
        if (isHandshake) {
            middleware(req, res, next);
        } else {
            next();
        }
    };
}

io.engine.use(onlyForHandshake(sessionMiddleware));
io.engine.use(onlyForHandshake(myPassport.session()));
io.engine.use(
    onlyForHandshake((req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.writeHead(401);
            res.end();
        }
    }),
);
io.on('connection', (socket) => {
    socket.on('send_message', async (req) => {
        // @ts-ignore
        const user = await socket.request.user;
        req.user_id = user.id;
        MessageController.createItem(req).then(async (data) => {
            io.emit('receive_message', data)
            // res.json(data)
        }).catch((error) => {
            // res.status(400);
            // res.json({
            //     type: 'error',
            //     error: error.message
            // })
        });
    })

    socket.on('NOTIFY_ALL', async (data) => {
        // @ts-ignore
        const user = await socket.request.user;
        if (data && data.value) {
            let flag = await new ChatUser().getOne(ChatUser, {chat_id: data.chat_id, user_id: user.id});
            if (flag && user.id !== data.user_id) {
                let notifyString = `Новое сообщение: ${data?.value?.length > 15 ? data.value.substring(0, 14) + '..' : data.value}`
                notifier.notify({
                    title: 'Kilogram',
                    message: notifyString,
                    icon: 'https://team2.storage.yandexcloud.net/uploads/ce84b3a9-1ddc-4f9a-adde-e63bad7d5aa3.png',
                    sound: true, // Only Notification Center or Windows Toasters
                    open: '/chat/' + data.chat_id
                });
            }
        }
    });
})


server.listen(PORT, () => {
    console.log(`
    Running on port ${PORT}.
    URL: ${PROTOCOL}://${SERVER_URL}${PORT !== '80' ? `:${PORT}` : ''}
    Documentation: ${PROTOCOL}://${SERVER_URL}${PORT !== '80' ? `:${PORT}` : ''}/api-docs
    `);
})
