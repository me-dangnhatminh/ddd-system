import { Global, Logger, Module, OnModuleInit } from '@nestjs/common';
import { RabbitMQService } from './rabbit-mq.service';

@Global()
@Module({
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class BrokenMessageModule implements OnModuleInit {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  async onModuleInit() {
    await this.rabbitMQService
      .connect()
      .then(() => Logger.log('RabbitMQ connected', BrokenMessageModule.name));
  }
}
