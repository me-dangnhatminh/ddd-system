import * as NestCommon from '@nestjs/common';
import * as NestCQRS from '@nestjs/cqrs';
import * as NestSwagger from '@nestjs/swagger';
import { isLeft } from 'fp-ts/lib/Either';

import * as Shared from '@shared';
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

  @NestCommon.Get('me')
  @NestCommon.HttpCode(NestCommon.HttpStatus.OK)
  @Common.HttpUserAuth()
  async getMe(@Common.HttpUser() user: Domain.User) {
    return {
      id: user.id,
      firstName: user.username.firstName,
      lastName: user.username.lastName,
      email: user.email.value,
      isVerified: user.isVerified,
    };
  }

  @NestCommon.Post(':userId/email/confirmation')
  @NestCommon.HttpCode(NestCommon.HttpStatus.OK)
  @Common.HttpUserAuth()
  async confirmEmail(
    @NestCommon.Body() body: EmailConfirmationBody,
    @NestCommon.Param() params: UserParams,
    @Common.HttpUser() requester: Domain.User,
  ) {
    if (requester.id !== params.userId)
      return `userId ${params.userId} does not match requester's id ${requester.id}`;
    if (requester.isVerified) return `You is already verified`;

    let command: NestCQRS.ICommand;
    if (!body.code)
      command = new App.RequestEmailConfirmationCommand(requester.email.value);
    else command = new App.ConfirmEmailCommand(requester.id, body.code);

    const result: Shared.TCommandResult =
      await this.commandBus.execute(command);
    if (isLeft(result)) return result.left;
    return result.right;
  }
}
