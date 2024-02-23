import * as NestCQRS from '@nestjs/cqrs';
import * as Either from 'fp-ts/Either';

import * as Shared from '@common';
import * as Domain from '../../../domain';

import { RegisterUserCommand } from '../register-user.command';

const CONFLICT_EMAIL: Shared.IErrorDetail = {
  code: Shared.ErrorTypes.CONFLICT,
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
    const existingUser = await this.userRepository.getByEmail(command.email);
    if (existingUser) return Either.left(CONFLICT_EMAIL);

    const user = Domain.User.registerAsUser(command);
    await this.userRepository.save(user);

    this.publisher.mergeObjectContext(user).commit();
    return Either.right(undefined);
  }
}
