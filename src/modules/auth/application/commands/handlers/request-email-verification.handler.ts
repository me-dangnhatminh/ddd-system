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

    await this.authService.saveEmailVerifyClaim(claim);
    this.authService.sendEmailVerification(claim); // send email async

    return right(undefined);
  }
}
