import * as NestCommon from '@nestjs/common';
import * as NestCQRS from '@nestjs/cqrs';
import * as NestSwagger from '@nestjs/swagger';

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
    if (requester.id !== params.userId)
      return `userId ${params.userId} does not match requester's id ${requester.id}`;

    const query = new App.GetProfileQuery(params.userId);
    const result: App.TGetProfileQueryResult =
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
    if (requester.id !== params.userId)
      return `userId ${params.userId} does not match requester's id ${requester.id}`;
    if (requester.isVerified) return `You is already verified`;

    let command: NestCQRS.ICommand;
    if (!body.code)
      command = new App.RequestEmailConfirmationCommand(requester.email.value);
    else command = new App.ConfirmEmailCommand(requester.id, body.code);

    const result = await this.commandBus.execute(command);
    return result;
  }
}
