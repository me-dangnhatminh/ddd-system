import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { User } from '../../../domain';
import { UserRepository } from '../../../domain/interfaces';
import { CreateUserCommand } from '../create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(command: CreateUserCommand): Promise<User> {
    const { requester, data } = command;
    const user = await this.userRepository.getUserByEmail(data.email);
    if (user) throw new Error('User already exists');
    const newUser = requester.createUser(data);
    await this.userRepository.create(newUser);
    newUser.commit();
    return newUser;
  }
}
