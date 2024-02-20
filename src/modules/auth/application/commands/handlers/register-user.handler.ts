import * as NestCQRS from '@nestjs/cqrs';
import * as Either from 'fp-ts/Either';

import { IErrorDetail } from '@common';

import { RegisterUserCommand } from '../register-user.command';
import { RegisteredUserEvent, User, UserRepository } from '../../../domain';
import { CONFLICT_EMAIL } from '../../common';

@NestCQRS.CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements NestCQRS.ICommandHandler<RegisterUserCommand>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventBus: NestCQRS.EventBus,
  ) {}

  async execute(
    command: RegisterUserCommand,
  ): Promise<Either.Either<IErrorDetail, void>> {
    const existingUser = await this.userRepository.getByEmail(command.email);
    if (existingUser) return Either.left(CONFLICT_EMAIL);

    const result = User.register(command);
    if (result._tag === 'Left') return Either.left(result.left);

    const user = result.right;
    // await this.userRepository.save(user); //TODO open this line

    user.commit();
    this.eventBus.publish(new RegisteredUserEvent(user)); //TODO: Why user aggregate is not auto published?

    return Either.right(undefined);
  }
}
