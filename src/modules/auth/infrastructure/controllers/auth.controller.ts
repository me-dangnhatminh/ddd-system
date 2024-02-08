import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Either, fold } from 'fp-ts/lib/Either';

import { ApiResponse, ErrorTypes, IErrorDetail } from '@common';
import { RegisterUserBody } from './view-models/register-user.dto';
import {
  LoginUserQuery,
  LoginUserQueryResult,
  RegisterUserCommand,
} from '../../application';
import { mapErrorTypeToHttpCode } from '../common/utils';
import { LoginUserBody } from './view-models/login-user.dto';
import { HttpUser, HttpUserAuth } from '../common/decorators';
import { User } from '../../domain';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() dto: RegisterUserBody): Promise<ApiResponse<void>> {
    const command = new RegisterUserCommand(dto);
    const result: Either<IErrorDetail, void> =
      await this.commandBus.execute(command);

    return fold<IErrorDetail, void, ApiResponse>(
      (err) =>
        ApiResponse.error({
          code: mapErrorTypeToHttpCode(err.type as ErrorTypes),
          message: err.message,
        }),
      () => ApiResponse.success(),
    )(result);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginUserBody) {
    const query = new LoginUserQuery(dto.email, dto.password);
    const result: Either<IErrorDetail, LoginUserQueryResult> =
      await this.queryBus.execute(query);

    return fold<
      IErrorDetail,
      LoginUserQueryResult,
      ApiResponse<LoginUserQueryResult> | ApiResponse
    >(
      (err) =>
        ApiResponse.error({
          code: mapErrorTypeToHttpCode(err.type as ErrorTypes),
          message: err.message,
        }),
      (res) => ApiResponse.success(res),
    )(result);
  }

  @Get('email-confirmation')
  @HttpCode(HttpStatus.OK)
  @HttpUserAuth()
  async confirmEmail(@Query('token') token: string, @HttpUser() user: User) {} //TODO: implement
}
