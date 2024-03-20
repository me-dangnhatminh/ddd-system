import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { VerifyPasswordResetTokenCommand } from '../verify-passwrod-reset-token.command';
import { IUserRepository } from '../../../domain';
import { AuthErrors } from '../../../common';
import { left, right } from 'fp-ts/lib/Either';
import { IAuthService } from 'src/modules/auth/domain/interfaces/auth-service.interface';

@CommandHandler(VerifyPasswordResetTokenCommand)
export class VerifyPasswordResetTokenHandler
  implements ICommandHandler<VerifyPasswordResetTokenCommand>
{
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly authService: IAuthService,
    private readonly publisher: EventPublisher,
  ) {}
  async execute(command: VerifyPasswordResetTokenCommand): Promise<any> {
    const { token } = command;
    const claim = await this.authService.validatePasswordResetToken(token);
    if (!claim) return left(AuthErrors.invalidResetPasswordToken());

    const email = claim.email;
    const user = await this.userRepository.getUserByEmail(claim.email);
    if (!user) return left(AuthErrors.userNotExits(email));

    user.changePassword(command.password);
    await this.userRepository.update(user);
    this.publisher.mergeObjectContext(user).commit();
    return right(undefined);
  }
}
