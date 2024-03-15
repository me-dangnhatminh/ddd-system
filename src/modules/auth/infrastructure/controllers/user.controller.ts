import * as NestCommon from '@nestjs/common';
import * as NestCQRS from '@nestjs/cqrs';
import * as NestSwagger from '@nestjs/swagger';
import { isLeft } from 'fp-ts/lib/Either';

import * as Shared from '@shared';
import * as App from '../../application';
import * as Domain from '../../domain';
import * as Common from '../../common';

import { EmailConfirmationBody } from './view-models';

@NestCommon.Controller('users')
@NestSwagger.ApiTags('users')
export class UserController {
  constructor(
    private readonly commandBus: NestCQRS.CommandBus,
    private readonly queryBus: NestCQRS.QueryBus,
  ) {}

  @NestCommon.Get('me')
  @NestCommon.HttpCode(NestCommon.HttpStatus.OK)
  @Common.HttpUserAuth()
  async getMe(@Common.HttpUser() user: Domain.User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email.value,
      isVerified: user.isVerified,
      avatarUrl: user.avatarUrl,
    };
  }

  @NestCommon.Post('me/email/confirmation')
  @NestCommon.HttpCode(NestCommon.HttpStatus.OK)
  @Common.HttpUserAuth()
  async confirmEmail(
    @NestCommon.Body() body: EmailConfirmationBody,
    @Common.HttpUser() requester: Domain.User,
  ) {
    if (requester.isVerified) return Common.AuthErrors.emailVerified();
    const email = requester.email.value;
    const command = new App.ConfirmEmailCommand(email, body.code);
    const result: Shared.TCommandResult =
      await this.commandBus.execute(command);
    if (isLeft(result)) return result.left;
    return result.right;
  }

  @NestCommon.Post('me/email/confirmation/request')
  @NestCommon.HttpCode(NestCommon.HttpStatus.OK)
  @Common.HttpUserAuth()
  async requestEmailConfirmation(@Common.HttpUser() requester: Domain.User) {
    if (requester.isVerified) return Common.AuthErrors.emailVerified();
    const email = requester.email.value;

    const command = new App.RequestEmailConfirmationCommand(email);
    const result: Shared.TCommandResult =
      await this.commandBus.execute(command);
    if (isLeft(result)) return result.left;
    return result.right;
  }
}
