import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChangePasswordCommand } from '../change-passwrod.command';
import { UserRepository } from 'src/modules/auth/domain';
import { IErrorDetail, Result } from '@common';
import { UserErrors } from '../../common/user-errors';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler
  implements ICommandHandler<ChangePasswordCommand>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    command: ChangePasswordCommand,
  ): Promise<Result<undefined, IErrorDetail>> {
    const { requester, currentPassword, newPassword } = command;
    const isVerified = command.requester.isVerified;
    if (!isVerified) return Result.failure(UserErrors.USER_NOT_VERIFIED);

    const passValid = requester.comparePassword(currentPassword);
    if (!passValid) return Result.failure(UserErrors.INVALID_PASSWORD);

    requester.changePassword(currentPassword, newPassword);
    await this.userRepository.update(requester);
    requester.commit();

    return Result.success();
  }
}
