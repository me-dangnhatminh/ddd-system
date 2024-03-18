import * as NestCQRS from '@nestjs/cqrs';

import * as Shared from '@shared';
import * as Domain from '../../../domain';
import { RequestEmailVerificationCommand } from '../request-email-verification.command';
import { AuthService } from '../../auth.service';
import { left, right } from 'fp-ts/lib/Either';
import { AuthErrors } from 'src/modules/auth/common';

@NestCQRS.CommandHandler(RequestEmailVerificationCommand)
export class RequestEmailVerificationHandler
  implements
    NestCQRS.ICommandHandler<
      RequestEmailVerificationCommand,
      Shared.TCommandResult
    >
{
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: Domain.IUserRepository,
  ) {}

  async execute(command: RequestEmailVerificationCommand) {
    const { email } = command;
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) return left(AuthErrors.userNotExits(email));
    await this.authService.requestEmailVerification(email);
    return right(undefined);
  }
}
