import { UserRole } from '@modules/user';
import { CreateUserCommand } from '@modules/user/commands';
import { GetUserReponseDTO } from '@modules/user/dtos';
import { GetUsersQuery } from '@modules/user/queries';

import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';

class CreateUserBody implements CreateUserCommand {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

@Controller('users')
export class UsersController {
  constructor(
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get('')
  async getUsers() {
    const query = new GetUsersQuery();
    const result = await this.queryBus.execute<any, GetUserReponseDTO>(query);
    return result;
  }

  @Post('')
  async createUser(@Body() body: CreateUserBody) {
    const { name, email, password, role } = body;
    const command = new CreateUserCommand(name, email, password, role);

    this.commandBus.execute<CreateUserCommand, void>(command);

    return;
  }
}
