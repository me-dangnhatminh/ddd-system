import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { User, UserRepository } from 'src/modules/auth/domain';
import { CreateUsersCommand } from '../create-users.command';

@CommandHandler(CreateUsersCommand)
export class CreateUsersHandler implements ICommandHandler<CreateUsersCommand> {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(command: CreateUsersCommand): Promise<User[]> {
    const { requester, data } = command;
    const users = requester.createUsers(data);
    await this.userRepository.saveMany(users);
    return users;
  }
}