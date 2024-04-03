import swaggerDocument from "./swagger-output.json";
import swaggerUi from "swagger-ui-express";
import express from 'express';
import {ChatView} from "./views/ChatView";
import 'dotenv/config'
import {UserView} from "./views/UserView";
import {MessageView} from "./views/MessageView";

const PORT: string = process.env.PORT || '3000'
const SERVER_URL: string = process.env.URL || 'localhost'
const PROTOCOL: string = process.env.PROTOCOL || 'http'

const app = express();

app.listen(PORT, () => {
    console.log(`
    Running on port ${PORT}.
    URL: ${PROTOCOL}://${SERVER_URL}${PORT !== '80' ? `:${PORT}` : ''}
    Documentation: ${PROTOCOL}://${SERVER_URL}${PORT !== '80' ? `:${PORT}` : ''}/api-docs
    `);
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', ChatView, UserView, MessageView);
