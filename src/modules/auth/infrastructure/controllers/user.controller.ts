import * as NestCommon from '@nestjs/common';
import * as NestCQRS from '@nestjs/cqrs';
import * as Either from 'fp-ts/lib/Either';
import * as NestSwagger from '@nestjs/swagger';

import * as Shared from '@common';
import * as App from '../../application';
import * as Domain from '../../domain';
import * as Common from '../../common';
import { EmailConfirmationBody, UserParams } from './view-models';

@NestCommon.Controller('users')
@NestSwagger.ApiTags('users')
export class UserController {
  constructor(
    private readonly commandBus: NestCQRS.CommandBus,
    private readonly queryBus: NestCQRS.QueryBus,
  ) {}

  @NestCommon.Get(':userId')
  @NestCommon.HttpCode(NestCommon.HttpStatus.OK)
  @Common.HttpUserAuth()
  async getProfile(
    @NestCommon.Param() params: UserParams,
    @Common.HttpUser() requester: Domain.User,
  ) {
    if (requester.id !== params.userId) {
      const query = new App.GetProfileQuery(params.userId);
      const result: Either.Either<Shared.IErrorDetail, Domain.User> =
        await this.queryBus.execute(query);
      return result;
    }

    // get profile as admin
    const isAdmin = new Domain.IsAdminSpec().isSatisfiedBy(requester);
    if (!isAdmin) return Either.left(new Shared.ForbiddenException());

    const query = new App.GetProfileAsAdminQuery(params.userId);
    const result: Either.Either<Shared.IErrorDetail, Domain.User> =
      await this.queryBus.execute(query);
    return result;
  }

  @NestCommon.Post(':userId/email/confirmation')
  @NestCommon.HttpCode(NestCommon.HttpStatus.OK)
  @Common.HttpUserAuth()
  async confirmEmail(
    @NestCommon.Body() body: EmailConfirmationBody,
    @NestCommon.Param() params: UserParams,
    @Common.HttpUser() requester: Domain.User,
  ) {
    const { code } = body;
    const { userId } = params;

    const command = new App.ConfirmEmailCommand(requester, userId, code);
    const result: Either.Either<Shared.IErrorDetail, void> =
      await this.commandBus.execute(command);

    return result;
  }
}
