import * as NestCommon from '@nestjs/common';
import * as NestCQRS from '@nestjs/cqrs';
import * as NestSwagger from '@nestjs/swagger';

import * as Either from 'fp-ts/lib/Either';

import * as Shared from '@common';
import * as App from '../../application';
import * as Domain from '../../domain';
import * as Common from '../../common';
import {
  EmailConfirmationBody,
  GetUsersPaginationnQuery,
  UserParams,
} from './view-models';

@NestCommon.Controller('users')
@NestSwagger.ApiTags('users')
export class UserController extends Common.Controller {
  constructor(
    private readonly commandBus: NestCQRS.CommandBus,
    private readonly queryBus: NestCQRS.QueryBus,
  ) {
    super();
  }

  @NestCommon.Get('')
  @NestCommon.HttpCode(NestCommon.HttpStatus.OK)
  @Common.HttpUserAuth({ roles: [Domain.UserRole.ADMIN] })
  async getAllAsAdmin(
    @Common.HttpUser() requester: Domain.User,
    @NestCommon.Query() query: GetUsersPaginationnQuery,
  ) {
    const result: Common.TQueryHandlerResult<App.GetAllAsAdminQueryResult> =
      await this.queryBus.execute(new App.GetAllAsAdminQuery(query));

    return this.fromEither(result);
  }

  @NestCommon.Get(':userId')
  @NestCommon.HttpCode(NestCommon.HttpStatus.OK)
  @Common.HttpUserAuth()
  async getProfile(
    @NestCommon.Param() params: UserParams,
    @Common.HttpUser() requester: Domain.User,
  ) {
    let query: NestCQRS.IQuery;

    if (requester.id === params.userId)
      query = new App.GetProfileQuery(params.userId);
    if (!requester.isAdmin()) return Either.left([Shared.FORBIDDEN]);

    query = new App.GetProfileAsAdminQuery(params.userId);
    const result: Either.Either<Shared.IErrorDetail, Domain.User> =
      await this.queryBus.execute(query);
    return result;
  }

  @NestCommon.Get(':userId')
  @NestCommon.HttpCode(NestCommon.HttpStatus.OK)
  @Common.HttpUserAuth({ roles: [Domain.UserRole.ADMIN] })
  async unregisterByAdmin() {}

  @NestCommon.Post(':userId/email/confirmation')
  @NestCommon.HttpCode(NestCommon.HttpStatus.OK)
  @Common.HttpUserAuth()
  async confirmEmail(
    @NestCommon.Body() body: EmailConfirmationBody,
    @NestCommon.Param() params: UserParams,
    @Common.HttpUser() requester: Domain.User,
  ) {
    if (requester.id !== params.userId) return Either.left(Shared.BAD_REQUEST);

    const command = new App.ConfirmEmailCommand(requester, body.code);
    const result: Either.Either<Shared.IErrorDetail, void> =
      await this.commandBus.execute(command);

    return result;
  }
}
