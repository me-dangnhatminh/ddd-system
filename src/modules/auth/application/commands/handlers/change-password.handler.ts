import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChangePasswordCommand } from '../change-passwrod.command';
import { UserRepository } from 'src/modules/auth/domain';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler
  implements ICommandHandler<ChangePasswordCommand>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: ChangePasswordCommand): Promise<void> {
    const { requester, currentPassword, newPassword } = command;
    const isVerified = command.requester.isVerified;
    if (!isVerified) throw new Error('User not verified');

    const isPasswordCorrect = await requester.comparePassword(currentPassword);
    if (!isPasswordCorrect) throw new Error('Invalid password');

    requester.changePassword(currentPassword, newPassword);
    await this.userRepository.update(requester);
    requester.commit();
  }
}
