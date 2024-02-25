import * as NestCQRS from '@nestjs/cqrs';
import * as Either from 'fp-ts/lib/Either';

import * as Shared from '@common';
import * as Domain from '../../../domain';
import * as Common from '../../../common';

import { ChangePasswordCommand } from '../change-password.command';

@NestCQRS.CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler
  implements NestCQRS.ICommandHandler<ChangePasswordCommand>
{
  constructor(private readonly userRepository: Domain.UserRepository) {}

  async execute(
    command: ChangePasswordCommand,
  ): Promise<Either.Either<Shared.IErrorDetail, void>> {
    const { requester, newPassword } = command;

    const compare = requester.comparePassword(newPassword);
    if (compare) return Either.left(Common.INVALID_PASSWORD);

    requester.changePassword(newPassword);
    await this.userRepository.update(requester);

    requester.commit();
    return Either.right(undefined);
  }
}
