import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TCommandResult } from '@shared';
import { VerifyEmailCodeCommand } from '../verify-email-code.command';
import { IAuthService, IUserRepository } from '../../../domain';
import { AuthErrors } from '../../../common';
import { left, right } from 'fp-ts/lib/Either';

@CommandHandler(VerifyEmailCodeCommand)
export class VerifyEmailCodeHandler
  implements ICommandHandler<VerifyEmailCodeCommand, TCommandResult>
{
  constructor(
    private readonly authService: IAuthService,
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(command: VerifyEmailCodeCommand): Promise<TCommandResult> {
    const { email, code } = command;
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) return left(AuthErrors.userNotExits(email));
    if (user.isVerified) return left(AuthErrors.emailAlreadyVerified());
    const isValid = await this.authService.validateEmailVerificationCode(
      email,
      code,
    );
    if (!isValid) return left(AuthErrors.invalidEmailCode());

    user.verifyEmail();
    await this.userRepository.update(user);
    return right(undefined);
  }
}