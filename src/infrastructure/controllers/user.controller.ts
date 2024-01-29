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
  DeleteUserCommand,
  CreateUsersCommand,
} from '@modules/auth';

import {
  CreateUserBody,
  CreateUserResponse,
  DeleteUsersQueryParamsDTO,
  GetUsersQueryParamsDTO,
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
    @Query() queryParams: GetUsersQueryParamsDTO,
  ): Promise<ApiResponse<GetUsersQueryResult>> {
    const query = new GetUsersQuery({
      page: queryParams.page,
      limit: queryParams.limit,
      search: queryParams.search,
      sortBy: queryParams.sortBy,
      sort: queryParams.sort,
    });
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
    const command = new CreateUsersCommand(requester, body.items);
    await this.commandBus.execute<CreateUsersCommand>(command);
    return ApiResponse.success();
  }

  @Delete(':id')
  @HttpUserAuth({ roles: [UserRole.ADMIN] })
  async deleteUsers(@HttpUser() requester: User, @Param('id') id: string) {
    const command = new DeleteUserCommand(requester, [id]);
    await this.commandBus.execute<DeleteUserCommand>(command);
    return ApiResponse.success();
  }

  @Delete('delete-multiple')
  @HttpUserAuth({ roles: [UserRole.ADMIN] })
  async deleteMultipleUsersByAdmin(
    @HttpUser() requester: User,
    @Query() queryParams: DeleteUsersQueryParamsDTO,
  ): Promise<ApiResponse> {
    const command = new DeleteUserCommand(requester, queryParams.ids);
    await this.commandBus.execute<DeleteUserCommand>(command);
    return ApiResponse.success();
  }

  @Get('me')
  @HttpUserAuth()
  async getMe(@HttpUser() user: User): Promise<ApiResponse<User>> {
    return ApiResponse.success(user);
  }
}
