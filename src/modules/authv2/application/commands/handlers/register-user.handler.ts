import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Either, left, right } from 'fp-ts/Either';
import { ErrorTypes, IErrorDetail } from '@common';

import { RegisterUserCommand } from '../register-user.command';
import { User, UserRepository } from '../../../domain';

const CONFLICT_EMAIL: IErrorDetail = {
  type: ErrorTypes.CONFLICT,
  message: 'Email already exists',
};

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    command: RegisterUserCommand,
  ): Promise<Either<IErrorDetail, void>> {
    const existingUser = await this.userRepository.getByEmail(command.email);
    if (existingUser) return left(CONFLICT_EMAIL);

    const result = User.register(command);
    if (result._tag === 'Left') return left(result.left);
    const user = result.right;

    await this.userRepository.save(user);
    user.commit();
    return right(undefined);
  }
}
