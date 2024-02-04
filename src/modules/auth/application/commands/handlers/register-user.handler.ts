import { AuthProvider, User, UserRepository, UserRole } from '../../../domain';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  RegisterUserCommand,
  RegisterUserCommandResult,
} from '../register-user.command';
import { Result } from '@common';
import { UserErrors } from '../../common/user-errors';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    command: RegisterUserCommand,
  ): Promise<RegisterUserCommandResult> {
    const { data } = command;

    const u = await this.userRepository.getOneByEmail(data.email);
    if (u) return Result.failure(UserErrors.USER_ALREADY_EXISTS);

    const newUser = await this.userRepository
      .create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        role: UserRole.USER,
        authProvider: AuthProvider.LOCAL,
      })
      .then((data) => User.create(data)); // to add create user event
    newUser.commit();
    return Result.success(newUser);
  }
}
