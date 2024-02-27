import * as NestCQRS from '@nestjs/cqrs';

import * as Domain from '../../../domain';
import * as Common from '../../../common';

import { ChangePasswordCommand } from '../change-password.command';
import { left, right } from 'fp-ts/lib/Either';
import { TCommandResult } from '@common';

@NestCQRS.CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler
  implements NestCQRS.ICommandHandler<ChangePasswordCommand, TCommandResult>
{
  constructor(private readonly userRepository: Domain.UserRepository) {}

  async execute(command: ChangePasswordCommand) {
    const { requester, newPassword } = command;

    const compare = requester.comparePassword(newPassword);
    if (!compare) return left([Common.INVALID_PASSWORD]);

    requester.changePassword(newPassword);
    await this.userRepository.update(requester);

    requester.commit();
    return right(undefined);
  }
}
