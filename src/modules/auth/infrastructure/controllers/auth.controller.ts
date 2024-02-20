import * as NestCommon from '@nestjs/common';
import * as NestCQRS from '@nestjs/cqrs';
import * as Either from 'fp-ts/lib/Either';

import { ApiResponse, IErrorDetail } from '@common';

import * as App from '../../application';
import * as Domain from '../../domain';
import * as Common from '../../common';

import { RegisterUserBody } from './view-models/register-user.dto';
import { LoginUserBody } from './view-models/login-user.dto';

@NestCommon.Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: NestCQRS.CommandBus,
    private readonly queryBus: NestCQRS.QueryBus,
  ) {}

  @NestCommon.Post('register')
  @NestCommon.HttpCode(NestCommon.HttpStatus.OK)
  async register(
    @NestCommon.Body() dto: RegisterUserBody,
  ): Promise<ApiResponse<void>> {
    const command = new App.RegisterUserCommand(dto);
    const result: Either.Either<IErrorDetail, void> =
      await this.commandBus.execute(command);

    return Common.EitherToApiResponse.fold(result);
  }

  @NestCommon.Post('login')
  @NestCommon.HttpCode(NestCommon.HttpStatus.OK)
  async login(@NestCommon.Body() dto: LoginUserBody) {
    const query = new App.LoginUserQuery(dto.email, dto.password);
    const result: Either.Either<IErrorDetail, App.LoginUserQueryResult> =
      await this.queryBus.execute(query);

    return Common.EitherToApiResponse.fold(result);
  }

  @NestCommon.Get('email-confirmation')
  @NestCommon.HttpCode(NestCommon.HttpStatus.OK)
  @Common.HttpUserAuth()
  async confirmEmail(
    @NestCommon.Query('code') code: number,
    @Common.HttpUser() user: Domain.User,
  ) {
    const command = new App.ConfirmEmailCommand(user, code);
    const result: Either.Either<IErrorDetail, void> =
      await this.commandBus.execute(command);

    return Common.EitherToApiResponse.fold(result);
  }
}
