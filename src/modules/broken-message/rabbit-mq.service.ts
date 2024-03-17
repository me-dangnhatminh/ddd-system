import * as amqp from 'amqplib';

export class RabbitMQService {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  async connect() {
    this.connection = await amqp.connect(
      process.env.RABBITMQ_URL || 'amqp://localhost',
    );
    this.channel = await this.connection.createChannel();
  }

  async produce(queue: string, message: string) {
    await this.channel.assertQueue(queue, { durable: false });
    await this.channel.sendToQueue(queue, Buffer.from(message));
  }

  async consume(queue: string, callback: (message: string) => void) {
    await this.channel.assertQueue(queue, { durable: false });
    this.channel.consume(queue, (message) => {
      if (message !== null) {
        callback(message.content.toString());
        this.channel.ack(message);
      }
    });
  }
}
