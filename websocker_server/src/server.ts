import express from 'express';
import amqplib from 'amqplib';
import { WebSocketServer, WebSocket } from 'ws';
require('dotenv').config();

// Create an express app
// Set up WebSocket server
const app = express();
const port = process.env.PORT;

// Start the server and connect to RabbitMQ
const server = app.listen(port, async () => {
    await connectRabbitMQ();
    console.log(`Get a Web Socket connection on  ws://localhost:${port}?id=x`);
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
    try {
        const connection = await amqplib.connect(amqpUrl);
        channel = await connection.createChannel();
      
        // Set up submission status exchange
        const solutionExchange = 'submission-status';
        await channel.assertExchange(solutionExchange, 'fanout', { durable: false });
      
        // Create an exclusive queue for this server
        const { queue } = await channel.assertQueue('', { exclusive: true });
        await channel.bindQueue(queue, solutionExchange, '');
      
        // Start consuming messages
        channel.consume(queue, (msg) => {
            if (msg) {
                try {
                    const data = JSON.parse(msg.content.toString());
                    const { submissionId, status, isFinal, time } = data;
                    // console.log("message recieved : ", data);
                    // Forward message to the correct client if connected
                    if (clients[submissionId] && clients[submissionId].readyState === WebSocket.OPEN) {
                        clients[submissionId].send(JSON.stringify({ status, isFinal, time }));
                        
                        if(isFinal) {
                            console.log(`Final message received for submission ${submissionId}. Closing connection.`);
                            clients[submissionId].close();
                            delete clients[submissionId]; // Cleanup
                        }
                    }


                } catch (e) {
                    console.error('Error processing RabbitMQ message:', e);
                }
            }
        }, { noAck: true });
      
        console.log('RabbitMQ connection established');
      
        // Handle connection errors and reconnect
        connection.on('error', (err) => {
            console.error('RabbitMQ connection error:', err);
            setTimeout(connectRabbitMQ, 5000);
        });
      
        connection.on('close', () => {
            console.error('RabbitMQ connection closed, reconnecting...');
            setTimeout(connectRabbitMQ, 5000);
        });
    } catch (error) {
      console.error('Failed to connect to RabbitMQ:', error);
      setTimeout(connectRabbitMQ, 5000);
    }
}


// Websocket Logic
wss.on('connection', (ws, req) => {
    const params = new URLSearchParams(req.url?.split('?')[1]);
    const submissionId = params.get('id')?.toString();

    if(!submissionId){
        console.log('Connection rejected: No submission ID provided');
        ws.close();
        return;
    }
    console.log(`User is connected for submission ${submissionId}`);
    clients[submissionId] = ws;
    
    ws.on('close', ()=> {
        console.log(`User is disconnected with submission ${submissionId}`);
        delete clients[submissionId];
    })

})
