import * as NestCommon from '@nestjs/common';
import * as NestCQRS from '@nestjs/cqrs';

@NestCommon.Controller('users')
export class UserController implements NestCommon.OnModuleInit {
  constructor(private readonly eventBus: NestCQRS.EventBus) {}
  onModuleInit() {}

  @NestCommon.Get('create-demo')
  async createDemo() {}
}
