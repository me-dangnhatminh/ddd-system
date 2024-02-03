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

    requester.changePassword(currentPassword, newPassword);
    await this.userRepository.update(requester);
    requester.commit();
  }
}
