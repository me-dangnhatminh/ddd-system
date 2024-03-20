import * as NestCQRS from '@nestjs/cqrs';

import * as Shared from '@shared';
import * as Domain from '../../../domain';
import { RequestEmailVerificationCommand } from '../request-email-verification.command';
import { left, right } from 'fp-ts/lib/Either';
import { AuthErrors } from '../../../common';

@NestCQRS.CommandHandler(RequestEmailVerificationCommand)
export class RequestEmailVerificationHandler
  implements
    NestCQRS.ICommandHandler<
      RequestEmailVerificationCommand,
      Shared.TCommandResult
    >
{
  constructor(
    private readonly authService: Domain.IAuthService,
    private readonly userRepository: Domain.IUserRepository,
  ) {}

  async execute(command: RequestEmailVerificationCommand) {
    const user = await this.userRepository.getUserByEmail(command.email);
    if (!user) return left(AuthErrors.userNotExits(command.email));
    const claim = user.toEmailVerifyClaim();

    const code = await this.authService.generateEmailVerificationCode(claim);
    this.authService.sendEmailVerificationCode(claim.email, code); // TODO: send not async

    return right(undefined);
  }
}
