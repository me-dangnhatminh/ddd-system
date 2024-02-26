import * as NestCommon from '@nestjs/common';
import * as NestCQRS from '@nestjs/cqrs';
import * as NestSwagger from '@nestjs/swagger';
import * as Express from 'express';

import * as Shared from '@common';
import * as App from '../../application';

import { RegisterUserBody, LoginUserBody } from './view-models';
import {
  AUTHENTICATED_USER_TOKEN_KEY,
  INVALID_EMAIL_OR_PASSWORD,
  TCommandHandlerResult,
} from '../../common';

@NestCommon.Controller('auth')
@NestSwagger.ApiTags('auth')
export class AuthController {
  constructor(
    private readonly commandBus: NestCQRS.CommandBus,
    private readonly queryBus: NestCQRS.QueryBus,
  ) {}

  @NestCommon.Post('register')
  @NestCommon.HttpCode(NestCommon.HttpStatus.OK)
  async register(@NestCommon.Body() dto: RegisterUserBody) {
    const command = new App.RegisterUserCommand(
      dto.firstName,
      dto.lastName,
      dto.email,
      dto.password,
    );
    const result: Shared.TCommandResult =
      await this.commandBus.execute(command);

    return result;
  }

  @NestCommon.Post('login')
  @NestCommon.HttpCode(NestCommon.HttpStatus.OK)
  async login(
    @NestCommon.Body() dto: LoginUserBody,
    @NestCommon.Res({ passthrough: true }) response: Express.Response,
  ) {
    const command = new App.LoginUserCommand(dto.email, dto.password);
    const commandresult: TCommandHandlerResult =
      await this.commandBus.execute(command);
    if (Shared.isFailure(commandresult))
      return Shared.Result.failure([INVALID_EMAIL_OR_PASSWORD]);
    const query = new App.GetAuthUserTokenQuery(dto.email);
    const queryresult: App.TGetAuthUserTokenQueryResult =
      await this.queryBus.execute(query);

    if (Shared.isFailure(queryresult)) return queryresult;

    response.cookie(AUTHENTICATED_USER_TOKEN_KEY, queryresult.data);
    return Shared.Result.success();
  }
}
