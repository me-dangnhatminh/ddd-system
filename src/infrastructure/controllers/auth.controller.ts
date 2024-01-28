import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { LoginUserBody } from './models/login-user.model';
import { LoginUserQuery, LoginUserQueryResult } from '@modules/auth';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { ApiResponse } from '@common';
import { RegisterUserCommand } from 'src/modules/auth/application/commands/register-user.command';
import { RegisterUserDTO } from './models';

export class LoggedInUserDTO {
  constructor(public readonly accessToken: string) {}
}
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
  ): Promise<ApiResponse<LoggedInUserDTO>> {
    const { email, password } = body;
    const query = new LoginUserQuery(email, password);
    return await this.queryBus
      .execute<LoginUserQuery, LoginUserQueryResult>(query)
      .then((result) => ApiResponse.success(result));
  }

  @Post('register')
  async register(@Body() body: RegisterUserDTO): Promise<ApiResponse> {
    const { firstName, lastName, email, password } = body;
    const command = new RegisterUserCommand({
      firstName,
      lastName,
      email,
      password,
    });
    await this.commandBus.execute<RegisterUserCommand>(command);
    return ApiResponse.success();
  }
}
