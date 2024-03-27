import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
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
    private readonly publisher: EventPublisher,
  ) {}
  async execute(command: VerifyEmailCodeCommand): Promise<TCommandResult> {
    const { email, code } = command;
    const claim = await this.authService.getEmailVerifyClaim(email);
    if (!claim || claim.email !== email || claim.code !== code)
      return left(AuthErrors.invalidEmailCode());

    const user = await this.userRepository.getUserByEmail(email);
    if (!user) throw new Error('User not found');

    user.verifyEmail();
    await this.userRepository.update(user);
    this.publisher.mergeObjectContext(user).commit();
    return right(undefined);
  }
}
