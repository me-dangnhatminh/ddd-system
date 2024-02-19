import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { Cache } from '@nestjs/cache-manager';
import { Either, left, right } from 'fp-ts/lib/Either';

import * as Common from '@common';
import * as Domain from '../../../domain';

import { SendVerifyEmailCommand } from '../send-verify-email.command';

const EMAIL_VERIFIED: Common.IErrorDetail = {
  type: 'EmailVerified',
  message: 'Email is already verified',
};

@CommandHandler(SendVerifyEmailCommand)
export class SendVerifyEmailHandler
  implements ICommandHandler<SendVerifyEmailCommand>
{
  constructor(@Inject('CACHE_MANAGER') private readonly cacheService: Cache) {}

  async execute(
    command: SendVerifyEmailCommand,
  ): Promise<Either<Common.IErrorDetail, void>> {
    const { requester } = command;
    const isVerified = requester.isVerified;
    if (isVerified) return left(EMAIL_VERIFIED);

    const email = requester.email;
    const code = this.generateCode();

    const codeTTL = 5; // 5 minutes
    const codeTTLMs = codeTTL * 60 * 1000;
    const expiredAt = Date.now() + codeTTLMs; // 5 minutes // TODO: add to config
    await this.cacheService.set(
      `verify-email:${requester.email}`,
      code,
      codeTTLMs, // in v5 ttl is miliseconds
    );

    const event = new Domain.EmailVerificationCodeRequestedEvent({
      email,
      code,
      expiredAt,
    });
    requester.apply(event);

    return right(undefined);
  }

  // 4 digit code
  private generateCode(): number {
    return Math.floor(1000 + Math.random() * 9000);
  }

  private saveCode(): void {}
}
