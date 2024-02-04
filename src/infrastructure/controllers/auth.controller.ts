import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { LoginUserBody } from './models/login-user.model';
import {
  LoginUserQuery,
  LoginUserQueryResult,
  User,
  VerifyEmailCommand,
} from '@modules/auth';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { ApiResponse, Result } from '@common';
import {
  RegisterUserCommand,
  RegisterUserCommandResult,
} from 'src/modules/auth/application/commands/register-user.command';
import { RegisterUserBody } from './models';
import { HttpUser } from './decorators/http-user.decorator';
import { HttpUserAuth } from './decorators';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() body: LoginUserBody,
  ): Promise<ApiResponse<{ accessToken: string }>> {
    const { email, password } = body;
    const query = new LoginUserQuery(email, password);
    return await this.queryBus
      .execute<LoginUserQuery, LoginUserQueryResult>(query)
      .then((res) => ApiResponse.success(res));
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() body: RegisterUserBody): Promise<ApiResponse> {
    const { firstName, lastName, email, password } = body;
    const command = new RegisterUserCommand({
      firstName,
      lastName,
      email,
      password,
    });
    const result: RegisterUserCommandResult =
      await this.commandBus.execute<RegisterUserCommand>(command);
    if (result.isFailure()) return ApiResponse.error(result.error);
    return ApiResponse.success();
  }

  @Patch('verify-email')
  @HttpUserAuth()
  async verifyEmail(
    @HttpUser() requester: User,
    @Query('code') code?: string,
  ): Promise<ApiResponse> {
    const command = new VerifyEmailCommand(requester, code);
    await this.commandBus.execute<VerifyEmailCommand>(command);
    return ApiResponse.success();
  }
}
