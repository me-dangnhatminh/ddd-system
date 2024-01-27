import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserBody } from './models/create-user.model';
import { LoginUserBody } from './models/login-user.model';
import {
  CreateUserCommand,
  LoginUserQuery,
  LoginUserQueryResult,
  UserRole,
} from '@modules/auth';
import { EventBus, QueryBus, CommandBus } from '@nestjs/cqrs';
import { ApiResponse } from '@common';

export class LoggedInUserDTO {
  constructor(public readonly accessToken: string) {}
}
@Controller('auth')
export class AuthController {
  constructor(
    private readonly eventBus: EventBus,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Post('login')
  async login(
    @Body() body: LoginUserBody,
  ): Promise<ApiResponse<LoggedInUserDTO>> {
    const { email, password } = body;
    const query = new LoginUserQuery(email, password);
    return await this.queryBus
      .execute<LoginUserQuery, LoginUserQueryResult>(query)
      .then((result) => ApiResponse.success(result));
  }

  @Post('register')
  async register(@Body() body: CreateUserBody): Promise<ApiResponse> {
    const { name, email, password } = body;
    const command = new CreateUserCommand(name, email, password, UserRole.USER);
    await this.commandBus.execute<CreateUserCommand, void>(command);
    return ApiResponse.success();
  }
}
