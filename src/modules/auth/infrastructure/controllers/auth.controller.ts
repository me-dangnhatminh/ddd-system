import * as NestCommon from '@nestjs/common';
import * as NestCQRS from '@nestjs/cqrs';
import * as NestSwagger from '@nestjs/swagger';
import * as Express from 'express';

import * as Shared from '@shared';
import * as App from '../../application';

import { RegisterUserBody, LoginUserBody } from './view-models';
import { AUTHENTICATED_USER_TOKEN_KEY } from '../../common';
import { isLeft, left, right } from 'fp-ts/lib/Either';

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
    const command = new App.RegisterUserCommand(dto);
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
    const commandresult: Shared.TCommandResult =
      await this.commandBus.execute(command);
    if (isLeft(commandresult)) left(commandresult.left);

    const query = new App.GetAuthUserTokenQuery(dto.email);
    const queryresult: App.TGetAuthUserTokenQueryResult =
      await this.queryBus.execute(query);

    if (isLeft(queryresult)) return left(queryresult.left);

    response.cookie(AUTHENTICATED_USER_TOKEN_KEY, queryresult.right);
    return right(undefined);
  }
}
