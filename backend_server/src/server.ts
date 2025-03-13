import express, { Request, Response } from 'express';
import multer from 'multer';
import amqplib from 'amqplib';
import { WebSocketServer, WebSocket } from 'ws';

// Set up storage for file uploads (temporary storage on the local server)
const storage = multer.memoryStorage();  // Files stored in memory
const upload = multer({ storage });

// Create an express app
// Set up WebSocket server
const app = express();
const port = 3000;

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

// Endpoint to handle file uploads
app.post('/submit_solution', upload.single('file'), async (req: any, res: any) => {
    try {
        if (!req.file && !req.body.code) {
            return res.status(400).json({ error: 'No file or code provided' });
        }

        // Extract code from file or text input
        const code = req.file ? req.file.buffer.toString() : req.body.code;
        const language = req.body.language || 'cpp';
        const problemId = req.body.problemId;
        const submissionId = req.body.submissionId;

        // Push the code to RabbitMQ queue
        const codeData = {
            submissionId,
            problemId,
            language,
            code
        };
        const options = {
            headers: {
                retryCount: 0,
            }
        };
        const queue = 'code_queue';
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(codeData)), options);

        // console.log(`Code pushed to queue: ${JSON.stringify(codeData)}`);

        // Send response to the user
        res.json({ message: 'Solution submitted successfully' });

    } catch (error) {
        console.error('Error submitting solution:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


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
