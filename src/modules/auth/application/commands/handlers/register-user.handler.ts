import { AuthProvider, User, UserRepository, UserRole } from '../../../domain';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from '../register-user.command';
import { IErrorDetail, Result } from '@common';
import { UserErrors } from '../../common/user-errors';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command): Promise<Result<User, IErrorDetail>> {
    const { data } = command;

    const u = await this.userRepository.getOneByEmail(data.email);
    if (u) return Result.failure(UserErrors.USER_ALREADY_EXISTS);

    const newUser = User.create({
      ...data,
      authProvider: AuthProvider.LOCAL,
      role: UserRole.USER,
    });

    await this.userRepository.create(newUser);

    newUser.commit();
    return Result.success(newUser);
  }
}
