import * as NestjsCommon from '@nestjs/common';
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

@NestjsCommon.Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @NestjsCommon.Post('register')
  @NestjsCommon.HttpCode(NestjsCommon.HttpStatus.OK)
  async register(
    @NestjsCommon.Body() dto: RegisterUserBody,
  ): Promise<ApiResponse<void>> {
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

  @NestjsCommon.Post('login')
  @NestjsCommon.HttpCode(NestjsCommon.HttpStatus.OK)
  async login(@NestjsCommon.Body() dto: LoginUserBody) {
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

  // @NestjsCommon.Get('email-confirmation')
  // @NestjsCommon.HttpCode(NestjsCommon.HttpStatus.OK)
  // @HttpUserAuth()
  // async confirmEmail(
  //   @NestjsCommon.Query('token') token: string,
  //   @HttpUser() user: User,
  // ) {} //TODO: implement
}
