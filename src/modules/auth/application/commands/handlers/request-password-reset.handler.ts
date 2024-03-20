import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { left } from 'fp-ts/lib/Either';
import { RequestPasswordResetCommand } from '../request-password-reset.command';
import { AuthErrors } from '../../../common';
import { IAuthService, IUserRepository } from '../../../domain';

@CommandHandler(RequestPasswordResetCommand)
export class RequestPasswordResetHandler
  implements ICommandHandler<RequestPasswordResetCommand>
{
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly authService: IAuthService,
  ) {}
  async execute(command: RequestPasswordResetCommand): Promise<any> {
    const email = command.email;
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) return left(AuthErrors.userNotExits(email));
    if (!user.isVerified) return left(AuthErrors.emailNotVerified());

    // ... logic to send email with reset password link
  }
}
