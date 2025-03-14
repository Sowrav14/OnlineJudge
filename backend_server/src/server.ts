import express from 'express';
import amqplib from 'amqplib';
import { WebSocketServer, WebSocket } from 'ws';

// Create an express app
// Set up WebSocket server
const app = express();
const port = 4000;

// Start the server and connect to RabbitMQ
const server = app.listen(port, async () => {
    await connectRabbitMQ();
    console.log(`Server is running on http://localhost:${port}`);
});
const wss = new WebSocketServer({ server });
const clients: Record<string, WebSocket> = {};

// Set up the RabbitMQ connection and channel
const amqpUrl = 'amqp://localhost';
let channel: amqplib.Channel;

/*
    message in exchange in this formate.
        submissionId,
        status,
        isFinal,
        time
*/


async function connectRabbitMQ() {
    const connection = await amqplib.connect(amqpUrl);
    channel = await connection.createChannel();
    const codeQueue = 'code_queue';
    await channel.assertQueue(codeQueue, { durable: false });

    const solutionExchange = 'submission-status';
    await channel.assertExchange(solutionExchange, 'fanout', {durable:false});
    const { queue } = await channel.assertQueue('', {exclusive:true});
    await channel.bindQueue(queue, 'submission-status', '');

    channel.consume(queue, (msg) => {
        if(msg){
            const data = JSON.parse(msg.content.toString());
            const { submissionId, status, time } = data;

            if(clients[submissionId]){
                clients[submissionId].send(JSON.stringify({status, time}));
            }
        }
    }, {noAck : true});
}


// Websocket Logic
wss.on('connection', (ws, req) => {
    const params = new URLSearchParams(req.url?.split('?')[1]);
    const Id = params.get('id')?.toString();

    if(!Id){
        ws.close();
        return;
    }
    console.log(`User is connected for submission ${Id}`);
    clients[Id] = ws;
    
    ws.on('close', ()=> {
        delete clients[Id];
    })

})
