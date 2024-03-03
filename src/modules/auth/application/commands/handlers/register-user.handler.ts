import * as NestCQRS from '@nestjs/cqrs';
import { left, right, Either } from 'fp-ts/lib/Either';

import * as Shared from '@shared';
import * as Domain from '../../../domain';

import { RegisterUserCommand } from '../register-user.command';
import { EMAIL_CONFLICT } from 'src/modules/auth/common';

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
  ): Promise<Either<Shared.IErrorDetail, void>> {
    const res = await this.userRepository.getUserByEmail(command.email);
    if (res) return left(EMAIL_CONFLICT);

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
    return right(undefined);
  }
}
