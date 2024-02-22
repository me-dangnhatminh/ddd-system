import * as NestCQRS from '@nestjs/cqrs';
import * as Either from 'fp-ts/lib/Either';

import * as Shared from '@common';
import * as Domain from '../../../domain';

import { ChangePasswordCommand } from '../change-password.command';

@NestCQRS.CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler
  implements NestCQRS.ICommandHandler<ChangePasswordCommand>
{
  async execute(
    command: ChangePasswordCommand,
  ): Promise<Either.Either<Shared.IErrorDetail, void>> {
    const { requester } = command;
    if (!requester.comparePassword(command.oldPassword))
      return Either.left(Domain.PASSWORD_NOT_MATCH);
    const result = requester.changePassword(command.newPassword);
    if (result._tag === 'Left') return Either.left(result.left);

    requester.commit();
    return Either.right(undefined);
  }
}
