import { connect } from 'amqplib';

// RabbitMQ connection configuration
const amqpUrl = process.env.RABBITMQ!
let channel: any = null;

// Initialize RabbitMQ connection
export async function connectRabbitMQ() {
  if (channel) return channel;
  
  try {
    const connection = await connect(amqpUrl);
    channel = await connection.createChannel();
    
    // Set up code queue
    const codeQueue = 'code_queue';
    await channel.assertQueue(codeQueue, { durable: false });
    
    // Set up submission status exchange
    const solutionExchange = 'submission-status';
    await channel.assertExchange(solutionExchange, 'fanout', { durable: false });
    
    return channel;
  } catch (error) {
    console.error('Failed to connect to RabbitMQ:', error);
    throw error;
  }
}