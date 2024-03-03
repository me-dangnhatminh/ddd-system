import * as NestCQRS from '@nestjs/cqrs';
import * as NestCache from '@nestjs/cache-manager';
import * as NestCommon from '@nestjs/common';
import { right } from 'fp-ts/lib/Either';

import * as Shared from '@shared';
import * as Domain from '../../../domain';

import { RequestEmailConfirmationCommand } from '../request-email-confirmation.command';

@NestCQRS.CommandHandler(RequestEmailConfirmationCommand)
export class RequestEmailConfirmationHandler
  implements
    NestCQRS.ICommandHandler<
      RequestEmailConfirmationCommand,
      Shared.TCommandResult
    >
{
  constructor(
    @NestCommon.Inject(NestCache.CACHE_MANAGER)
    private readonly cacheService: Domain.CacheService,
    private readonly eventBus: NestCQRS.EventBus,
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
