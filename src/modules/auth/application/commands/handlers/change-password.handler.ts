import * as NestCQRS from '@nestjs/cqrs';

import * as Domain from '../../../domain';

import { ChangePasswordCommand } from '../change-password.command';
import { IErrorDetail, TCommandResult } from '@common';
import { left, right } from 'fp-ts/lib/Either';

const INVALID_PASSWORD: IErrorDetail = {
  code: 'invalid_password',
  message: 'Old password does not match user password',
};

@NestCQRS.CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler
  implements NestCQRS.ICommandHandler<ChangePasswordCommand, TCommandResult>
{
  constructor(private readonly userRepository: Domain.UserRepository) {}

  async execute(command: ChangePasswordCommand) {
    const { userId, oldPassword, newPassword } = command;

    const user = await this.userRepository.getUserById(userId);
    if (!user) throw new Error('InvalidOperation: User not found');

    const compare = user.comparePassword(oldPassword);
    if (!compare) return left([INVALID_PASSWORD]);

    user.changePassword(newPassword);
    await this.userRepository.update(user);

    user.commit();
    return right(undefined);
  }
}
