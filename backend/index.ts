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

app.use(fileUpload({}));

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
    console.log("connected")
    socket.on('send_message', async (req) => {
        // @ts-ignore
        const user = await socket.request.user;
        await user.updateActivity();
        req.user_id = user.id;
        MessageController.createItem(req).then((data) => {
            console.log(data)
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

})


server.listen(PORT, () => {
    console.log(`
    Running on port ${PORT}.
    URL: ${PROTOCOL}://${SERVER_URL}${PORT !== '80' ? `:${PORT}` : ''}
    Documentation: ${PROTOCOL}://${SERVER_URL}${PORT !== '80' ? `:${PORT}` : ''}/api-docs
    `);
})
