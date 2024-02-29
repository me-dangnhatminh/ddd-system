import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { RequestEmailConfirmationCommand } from '../request-email-confirmation.command';
import * as Domain from '../../../domain';
import { TCommandResult } from '@common';
import { right } from 'fp-ts/lib/Either';

@CommandHandler(RequestEmailConfirmationCommand)
export class RequestEmailConfirmationHandler
  implements ICommandHandler<RequestEmailConfirmationCommand, TCommandResult>
{
  constructor(
    private readonly cacheService: Domain.CacheService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: RequestEmailConfirmationCommand) {
    const { email } = command;

    const code = this.generateCode();
    const codeTTL = 5; // 5 minutes
    const codeTTLMs = codeTTL * 60 * 1000;
    const expiredAt = Date.now() + codeTTLMs;
    await this.cacheService.setEmailVerificationCode(email, code, codeTTLMs);
    const event = new Domain.EmailVerificationCodeRequestedEvent({
      email,
      code,
      expiredAt,
    });
    await this.eventBus.publish(event);
    return right(undefined);
  }

  private generateCode(): number {
    return Math.floor(1000 + Math.random() * 9000);
  }
}
