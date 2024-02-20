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
export class UserController implements NestCommon.OnModuleInit {
  constructor(private readonly commandBus: NestCQRS.CommandBus) {}
  onModuleInit() {}

  @NestCommon.Post(':userId/email/confirmation')
  @NestCommon.HttpCode(NestCommon.HttpStatus.OK)
  @Common.HttpUserAuth()
  async confirmEmail(
    @NestCommon.Body() body: EmailConfirmationBody,
    @NestCommon.Param() params: UserParams,
    @Common.HttpUser() requester: Domain.User,
  ): Promise<Shared.ApiResponse<void>> {
    const { code } = body;
    const { userId } = params;

    const command = new App.ConfirmEmailCommand(requester, userId, code);
    const result: Either.Either<Shared.IErrorDetail, void> =
      await this.commandBus.execute(command);

    return Common.EitherToApiResponse.fold(result);
  }
}
