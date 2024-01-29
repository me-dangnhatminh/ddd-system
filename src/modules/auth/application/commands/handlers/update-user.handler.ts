import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdateUserCommand } from '../update-user.command';
import { UserRepository } from '../../../domain/interfaces';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(command: UpdateUserCommand): Promise<void> {
    const { requester } = command;
    const user = await this.userRepository.getOneById(command.updatedUserId);
    if (!user) throw new Error('User not found');
    requester.updateUser(user, command.data);
    await this.userRepository.update(user);
    user.commit();
  }
}
