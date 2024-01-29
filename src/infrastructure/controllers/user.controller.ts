import { ApiResponse } from '@common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';

import {
  User,
  CreateUserCommand,
  RegisterUserCommand,
  GetUsersQuery,
  GetUsersQueryResult,
  UserRole,
} from '@modules/auth';

import {
  CreateUserBody,
  CreateUserResponse,
  UserQueryParamsDTO,
} from './models';
import { HttpUserAuth, HttpUser } from './decorators';
import { CreateMultipleUsersBody } from './models/create-multiple-users.model';

@Controller('users')
export class UserController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  @HttpUserAuth({ roles: [UserRole.ADMIN] })
  async getAllByAdmin(
    @Query() queryParams: UserQueryParamsDTO,
  ): Promise<ApiResponse<GetUsersQueryResult>> {
    const query = new GetUsersQuery(queryParams);
    return await this.queryBus
      .execute<GetUsersQuery, GetUsersQueryResult>(query)
      .then((result) => ApiResponse.success<GetUsersQueryResult>(result));
  }

  @Post()
  @HttpUserAuth({ roles: [UserRole.ADMIN] })
  async createUserByAdmin(
    @HttpUser() requester: User,
    @Body() body: CreateUserBody,
  ): Promise<ApiResponse<CreateUserResponse>> {
    const command = new CreateUserCommand(requester, body);
    return await this.commandBus
      .execute<RegisterUserCommand>(command)
      .then((result) =>
        ApiResponse.success(plainToInstance(CreateUserResponse, result)),
      );
  }

  @Post('create-multiple')
  @HttpUserAuth({ roles: [UserRole.ADMIN] })
  async createMultipleUsersByAdmin(
    @HttpUser() requester: User,
    @Body() body: CreateMultipleUsersBody,
  ): Promise<ApiResponse<unknown>> {
    const process: Promise<any>[] = [];
    for (const item of body.items) {
      const command = new CreateUserCommand(requester, item);
      process.push(this.commandBus.execute<RegisterUserCommand>(command));
    }
    await Promise.all(process);
    return ApiResponse.success();
  }

  @Delete(':userId')
  @HttpUserAuth({ roles: [UserRole.ADMIN] })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async deleteUser(@Param('userId') userId: string) {
    throw new Error('Not implemented'); // TODO: Implement this
  }

  @Delete('delete-multiple')
  @HttpUserAuth({ roles: [UserRole.ADMIN] })
  async deleteMultipleUsersByAdmin(@Query('userIds') userIds: string[]) {
    throw new Error('Not implemented'); // TODO: Implement this
  }

  @Get('me')
  @HttpUserAuth()
  async getMe(@HttpUser() user: User): Promise<ApiResponse<User>> {
    return ApiResponse.success(user);
  }
}
