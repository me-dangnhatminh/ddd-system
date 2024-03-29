import * as NestCQRS from '@nestjs/cqrs';
import { left, right } from 'fp-ts/lib/Either';

import * as Shared from '@shared';
import * as Domain from '../../../domain';
import { AuthErrors } from '../../../common';

import { ChangePasswordCommand } from '../change-password.command';

@NestCQRS.CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler
  implements
    NestCQRS.ICommandHandler<ChangePasswordCommand, Shared.TCommandResult>
{
  constructor(private readonly userRepository: Domain.IUserRepository) {}

  async execute(command: ChangePasswordCommand) {
    const { userId, oldPassword, newPassword } = command;

    const user = await this.userRepository.getUserById(userId);
    if (!user) throw new Error('InvalidOperation: User not found');

    const compare = user.comparePassword(oldPassword);

    if (!compare) return left(AuthErrors.invalidCredentials());

    user.changePassword(newPassword);
    await this.userRepository.update(user);

    user.commit();
    return right(undefined);
  }
}
