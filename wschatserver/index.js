const { WebSocketServer, WebSocket } = require('ws');
const dotenv = require('dotenv');
// const { Kafka } = require("kafkajs");
dotenv.config();
let users = [];

const wss = new WebSocketServer( { port: 9090 } );
// const kafka = new Kafka({
//     brokers: ['popular-insect-7808-us1-kafka.upstash.io:9092'],
//     sasl: {
//       mechanism: 'scram-sha-256',
//       username: 'cG9wdWxhci1pbnNlY3QtNzgwOCTauBof4nDngrrBXNy5h227Fd99BVRACmFZu3c',
//       password: '7b8004e29da444edb7a5a36d53d6dfd4',
//     },
//     ssl: true,
// });

// const producer = kafka.producer();

wss.on("connection", (ws, request, client) => {
    // producer.connect();
    ws.on("error", (error) => console.error(error));

    ws.on("message", (data) => {
        let message = JSON.parse(data);
        console.log(message);

        if(message.type === 'join'){
            users.push(message.userName);
        } else if(message.type === 'leave'){
            users = users.splice(message.userName, 1);
        }

        wss.clients.forEach( (client) => {
            if(client.readyState === WebSocket.OPEN){
                client.send(JSON.stringify(message));
            }
        })
    });
});