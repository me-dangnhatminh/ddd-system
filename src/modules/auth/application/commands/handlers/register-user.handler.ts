import { AuthProvider, User, UserRepository, UserRole } from '../../../domain';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from '../register-user.command';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command) {
    const { data } = command;
    await this.userRepository.getUserByEmail(data.email).then((user) => {
      if (user) throw new Error('User already exists');
    });
    const newUser = User.create({
      ...data,
      authProvider: AuthProvider.LOCAL,
      role: UserRole.USER,
    });
    await this.userRepository.create(newUser);
    newUser.commit();
    return newUser;
  }
}
