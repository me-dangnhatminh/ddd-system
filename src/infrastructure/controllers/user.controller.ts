import { ApiResponse } from '@common';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventBus, QueryBus, CommandBus } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';

import {
  User,
  CreateUserCommand,
  RegisterUserCommand,
  GetUsersQuery,
  GetUsersQueryResult,
} from '@modules/auth';

import { CreateUserBody, CreateUserResponse } from './models';
import { HttpUser } from './decorators/HttpUser';

@Controller('users')
export class UserController {
  constructor(
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  async getAll(): Promise<ApiResponse<GetUsersQueryResult>> {
    const query = new GetUsersQuery();
    return await this.queryBus
      .execute<GetUsersQuery, GetUsersQueryResult>(query)
      .then((result) => ApiResponse.success<GetUsersQueryResult>(result));
  }

  @Post('')
  async createUser(
    @HttpUser() requester: User,
    @Body() body: CreateUserBody,
  ): Promise<ApiResponse<CreateUserResponse>> {
    const { firstName, lastName, email, password, role, avatarUrl } = body;
    const command = new CreateUserCommand(requester, {
      firstName,
      lastName,
      email,
      password,
      role,
      avatarUrl,
    });
    return await this.commandBus
      .execute<RegisterUserCommand>(command)
      .then((result) =>
        ApiResponse.success(plainToInstance(CreateUserResponse, result)),
      );
  }

  @Post('create-multiple')
  async createMultipleUsersByAdmin(): Promise<ApiResponse<unknown>> {
    throw new Error('Not implemented');
  }
}
