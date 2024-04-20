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

const pgp = require('pg-promise')();
const PORT: string = process.env.PORT || '3000'
const SERVER_URL: string = process.env.URL || 'localhost'
const PROTOCOL: string = process.env.PROTOCOL || 'http'

const app = express();

export const db = pgp(process.env.DATABASE_URL);

app.use(cookieParser());
app.use(bodyParser.json());

app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET || '',
    resave: false,
    saveUninitialized: false,
}));

app.use(myPassport.initialize());
app.use(myPassport.session());

app.use(express.static('./storage'));
app.use(express.static('../frontend/build'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', AuthView);
app.use('/api', isAuthenticatedMiddleware, ChatView, UserView, MessageView);
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.listen(PORT, () => {
    console.log(`
    Running on port ${PORT}.
    URL: ${PROTOCOL}://${SERVER_URL}${PORT !== '80' ? `:${PORT}` : ''}
    Documentation: ${PROTOCOL}://${SERVER_URL}${PORT !== '80' ? `:${PORT}` : ''}/api-docs
    `);
})
