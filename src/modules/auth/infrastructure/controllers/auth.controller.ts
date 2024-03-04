import * as NestCommon from '@nestjs/common';
import * as NestCQRS from '@nestjs/cqrs';
import * as NestSwagger from '@nestjs/swagger';
import * as Express from 'express';
import { isLeft } from 'fp-ts/lib/Either';

import * as Shared from '@shared';
import * as Common from '../../common';
import * as App from '../../application';

import { RegisterUserBody, LoginUserBody } from './view-models';

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

    if (isLeft(result)) return result.left;
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
    if (isLeft(commandresult)) return commandresult.left;

    const query = new App.GetAuthUserTokenQuery(dto.email);
    const queryresult: App.TGetAuthUserTokenQueryResult =
      await this.queryBus.execute(query);

    if (isLeft(queryresult)) return queryresult.left;
    const accessToken = queryresult.right.accessToken;
    response.header(Common.AUTHENTICATED_USER_TOKEN_KEY, accessToken);
  }
}
