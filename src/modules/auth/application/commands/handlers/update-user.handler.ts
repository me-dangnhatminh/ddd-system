import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdateUserCommand } from '../update-user.command';
import { UserRepository } from '../../../domain/interfaces';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(command: UpdateUserCommand): Promise<void> {
    const { name, email, role } = command;
    const user = await this.userRepository.getUserByEmail(command.email);
    if (!user) throw new Error('User not found');

    const canUpdate = user.getPermissions().canUpdate;
    if (!canUpdate) throw new Error('User not authorized to update');

    const result = user.update({ name, email, role });
    if (result.isFailure()) throw new Error(result.error);
    await this.userRepository.update(user);
    user.commit();
  }
}
