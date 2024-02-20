import * as NestCommon from '@nestjs/common';
import * as NestCQRS from '@nestjs/cqrs';
import * as Either from 'fp-ts/lib/Either';
import * as NestSwagger from '@nestjs/swagger';

import * as Shared from '@common';
import * as App from '../../application';
import * as Common from '../../common';

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
  async register(
    @NestCommon.Body() dto: RegisterUserBody,
  ): Promise<Shared.ApiResponse<void>> {
    const command = new App.RegisterUserCommand(dto);
    const result: Either.Either<Shared.IErrorDetail, void> =
      await this.commandBus.execute(command);

    return Common.EitherToApiResponse.fold(result);
  }

  @NestCommon.Post('login')
  @NestCommon.HttpCode(NestCommon.HttpStatus.OK)
  async login(@NestCommon.Body() dto: LoginUserBody) {
    const query = new App.LoginUserQuery(dto.email, dto.password);
    const result: Either.Either<Shared.IErrorDetail, App.LoginUserQueryResult> =
      await this.queryBus.execute(query);

    return Common.EitherToApiResponse.fold(result);
  }
}
