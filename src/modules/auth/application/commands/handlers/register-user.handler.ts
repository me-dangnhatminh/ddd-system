import * as NestCQRS from '@nestjs/cqrs';
import * as Either from 'fp-ts/Either';
import { ErrorTypes, IErrorDetail } from '@common';

import { RegisterUserCommand } from '../register-user.command';
import { RegisteredUserEvent, User, UserRepository } from '../../../domain';

const CONFLICT_EMAIL: IErrorDetail = {
  type: ErrorTypes.CONFLICT,
  message: 'Email already exists',
};

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
    // const existingUser = await this.userRepository.getByEmail(command.email);
    // if (existingUser) return Either.left(CONFLICT_EMAIL);

    const user = User.create(command);
    user.apply(new RegisteredUserEvent(user));
    console.log(this.eventBus);

    // const result = User.register(command);
    // if (result._tag === 'Left') return Either.left(result.left);

    // const user = result.right;
    // await this.userRepository.save(user);

    user.commit();
    return Either.right(undefined);
  }
}
