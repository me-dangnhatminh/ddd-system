import { User } from '../../domain';
import { UserRepository } from '../../interfaces';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}
  execute(command: CreateUserCommand): Promise<User> {
    const { name, email, password, role } = command;
    return this.userRepository.create({ name, email, password, role });
  }
}
