const { WebSocketServer, WebSocket } = require('ws');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const User = require('./model/user');
// const bodyParser = require('body-parser');
dotenv.config();

let users = [];

const app = express();
app.use(cors());

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.post('/signin', function(req, res) {
    let foundIdx = users.findIndex(e => e.userName == req.body.userName);
    if(foundIdx > -1) {
        throw new Error('이미 존재하는 ID입니다. 다른 아이디로 다시 접속해주세요.');
    } else {
        let user = new User(req.body.userName, req.headers.referer);
        users.push(user);
        res.json({"message" : "접속합니다.", "success" : true});
    }
});

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