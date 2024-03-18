import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TCommandResult } from '@shared';
import { VerifyEmailCodeCommand } from '../verify-email-code.command';
import { IUserRepository } from '../../../domain';
import { AuthService } from '../../auth.service';
import { AuthErrors } from '../../../common';
import { left, right } from 'fp-ts/lib/Either';

@CommandHandler(VerifyEmailCodeCommand)
export class VerifyEmailCodeHandler
  implements ICommandHandler<VerifyEmailCodeCommand, TCommandResult>
{
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: IUserRepository,
  ) {}
  async execute(command: VerifyEmailCodeCommand): Promise<TCommandResult> {
    const { email, code } = command;
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) throw new Error('InvalidOperation: User not found');
    if (user.isVerified) return left(AuthErrors.emailAlreadyVerified());
    const isValid = await this.authService.verifyEmailCode(email, code);
    if (!isValid) return left(AuthErrors.invalidEmailCode());

    return right(undefined);
  }
}
