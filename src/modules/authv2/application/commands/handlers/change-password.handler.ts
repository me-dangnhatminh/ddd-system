import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Either, left, right } from 'fp-ts/Either';

import { IErrorDetail } from '@common';

import { ChangePasswordCommand } from '../change-password.command';
import { PASSWORD_NOT_MATCH } from '../../../domain';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler
  implements ICommandHandler<ChangePasswordCommand>
{
  async execute(
    command: ChangePasswordCommand,
  ): Promise<Either<IErrorDetail, void>> {
    const { requester } = command;
    if (!requester.comparePassword(command.oldPassword))
      return left(PASSWORD_NOT_MATCH);
    const result = requester.changePassword(command.newPassword);
    if (result._tag === 'Left') return left(result.left);

    requester.commit();
    return right(undefined);
  }
}
