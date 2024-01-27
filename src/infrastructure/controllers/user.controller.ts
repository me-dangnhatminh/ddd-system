import { Body, Controller, Get, OnModuleInit, Post } from '@nestjs/common';

import { CreateUserBody } from './models/create-user.model';
import { LoginUserBody } from './models/login-user.model';
import {
  GetUsersQuery,
  GetUserReponseDTO,
  CreateUserCommand,
  LoginUserQuery,
  LoginUserQueryResult,
} from '@modules/auth';
import {
  EventsHandler,
  IEventHandler,
  EventBus,
  QueryBus,
  CommandBus,
} from '@nestjs/cqrs';
import { UserCreatedEvent } from '@modules/auth';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  handle(event: UserCreatedEvent) {
    console.log('UserCreatedEvent', event);
  }
}

@Controller('users')
export class UsersController implements OnModuleInit {
  constructor(
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}
  onModuleInit() {
    this.eventBus.register([UserCreatedHandler]);
  }

  @Get()
  async getUsers() {
    const query = new GetUsersQuery();
    return await this.queryBus.execute<any, GetUserReponseDTO>(query);
  }

  @Post()
  async createUser(@Body() body: CreateUserBody) {
    const { name, email, password, role } = body;
    const command = new CreateUserCommand(name, email, password, role);
    await this.commandBus.execute<CreateUserCommand, void>(command);
  }

  @Post('login')
  async login(@Body() body: LoginUserBody) {
    const { email, password } = body;
    const query = new LoginUserQuery(email, password);
    return await this.queryBus.execute<any, LoginUserQueryResult>(query);
  }
}
