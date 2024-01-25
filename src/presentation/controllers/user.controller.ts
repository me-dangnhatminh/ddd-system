import {
  GetUsersQuery,
  LoginUserQuery,
  LoginUserQueryResult,
} from '@modules/user/application/queries';
import { CreateUserCommand } from '@modules/user/application/commands';
import { GetUserReponseDTO } from '@modules/user/application/dtos';

import { CreateUserBody } from './models/create-user.model';
import { LoginUserBody } from './models/login-user.model';

import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';

@Controller('users')
export class UsersController {
  constructor(
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  async getUsers() {
    const query = new GetUsersQuery();
    const result = await this.queryBus.execute<any, GetUserReponseDTO>(query);
    return result;
  }

  @Post()
  async createUser(@Body() body: CreateUserBody) {
    const { name, email, password, role } = body;
    const command = new CreateUserCommand(name, email, password, role);
    this.commandBus.execute<CreateUserCommand, void>(command);
    return;
  }

  @Post('login')
  async login(@Body() body: LoginUserBody) {
    const { email, password } = body;
    const query = new LoginUserQuery(email, password);
    return await this.queryBus
      .execute<any, LoginUserQueryResult>(query)
      .then((result) => {
        return result;
      });
  }
}
