const PORT: string = process.env.PORT || '3000'
import express from 'express';

const app = express();
import {ChatController} from "./controllers/ChatController";
import {ChatView} from "./views/ChatView";

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}.
    url: http://127.0.0.1:${PORT}`)
})

app.use('/api', ChatView);

