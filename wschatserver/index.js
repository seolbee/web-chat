import { WebSocketServer, WebSocket } from 'ws';
import express, { urlencoded, json } from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import {router, users} from './routes/main.controller.js';
// const bodyParser = require('body-parser');
config();

// import {app} from './firebase';

const app = express();
app.use(cors());

app.use(urlencoded({extended: false}));
app.use(json());
app.use("/", router);

app.use(function (err, req, res, next) {
    // console.error(err);
    let response = {};

    res.status(500);

    response.status = 500;
    response.message = err.message;
    console.error(response);

    res.json(response);
});

app.listen(8080);

const wss = new WebSocketServer( { port: 9090 } );

wss.on("connection", (ws) => {

    ws.on("open", (e) => {
        console.log(e);
    });

    ws.on("error", (error) => {
        ws.send(JSON.stringify({"message" : error.message}));
    });

    ws.on("message", (data) => {
        let message = JSON.parse(data);

        if(message.type === 'join'){
        } else if(message.type === 'leave'){
            users = users.filter((e) => e.userName != message.userName);
            ws.close();
        }

        wss.clients.forEach( (client) => {
            if(client.readyState === WebSocket.OPEN){
                client.send(JSON.stringify({...message, isMine : client === ws}));
            }
        });
    });

    ws.on("close", () => {
        ws.terminate();
    });
});

wss.on("close", () => {
    users.clear();
});