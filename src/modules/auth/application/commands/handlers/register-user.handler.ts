import * as NestCQRS from '@nestjs/cqrs';
import * as Either from 'fp-ts/Either';

import * as Shared from '@common';
import * as Domain from '../../../domain';

import { RegisterUserCommand } from '../register-user.command';

const CONFLICT_EMAIL: Shared.IErrorDetail = {
  code: 'conflict_email',
  message: 'Email already exists',
};

@NestCQRS.CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements NestCQRS.ICommandHandler<RegisterUserCommand>
{
  constructor(
    private readonly userRepository: Domain.UserRepository,
    private readonly publisher: NestCQRS.EventPublisher,
  ) {}

  async execute(
    command: RegisterUserCommand,
  ): Promise<Either.Either<Shared.IErrorDetail, void>> {
    const res = await this.userRepository.getUserByEmail(command.email);
    if (res) return Either.left(CONFLICT_EMAIL);

    const username = Domain.UserName.new(command.firstName, command.lastName);
    const email = Domain.UserEmail.new(command.email);
    const password = Domain.UserPassword.new(command.password);

    const user = Domain.User.registerUser({
      username,
      email,
      password,
      authProvider: Domain.AuthProvider.LOCAL,
      isVerified: false,
      avatarUrl: '',
    });
    await this.userRepository.save(user);

    this.publisher.mergeObjectContext(user).commit();
    return Either.right(undefined);
  }
}
