import * as NestCQRS from '@nestjs/cqrs';
import * as NestCommon from '@nestjs/common';
import * as NestCache from '@nestjs/cache-manager';
import * as Either from 'fp-ts/Either';

import { IErrorDetail } from '@common';
import * as Common from '../../../common';
import * as Domain from '../../../domain';

import { ConfirmEmailCommand } from '../confirm-email.command';

@NestCQRS.CommandHandler(ConfirmEmailCommand)
export class ConfirmEmailHandler
  implements NestCQRS.ICommandHandler<ConfirmEmailCommand>
{
  constructor(
    @NestCommon.Inject(NestCache.CACHE_MANAGER)
    private readonly cacheService: NestCache.Cache,
    private readonly userRepository: Domain.UserRepository,
    private readonly publisher: NestCQRS.EventPublisher,
  ) {}

  async execute(
    command: ConfirmEmailCommand,
  ): Promise<Either.Either<IErrorDetail, void>> {
    const { requester, code } = command;

    if (!code) return this.genAndSendVerifyCode(requester);
    return this.verifyCode(requester, code);
  }

  private async genAndSendVerifyCode(requester: Domain.User) {
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
    this.publisher.mergeObjectContext(requester).commit();

    return Either.right(undefined);
  }

  private async verifyCode(requester: Domain.User, code: number) {
    const { email } = requester;
    const codeKey = `verify-email:${email}`;
    const cachedCode = await this.cacheService.get(codeKey);

    // compare the code
    if (cachedCode !== code)
      return Either.left(Common.INVALID_EMAIL_VERIFICATION_CODE);
    requester.verifyEmail(); // TODO: Add event to the user entity
    // await this.cacheService.del(codeKey);
    await this.userRepository.update(requester);

    // publish the event
    this.publisher.mergeObjectContext(requester).commit();
    return Either.right(undefined);
  }

  /**
   * Generate a 4 digit code
   */
  private generateCode(): number {
    return Math.floor(1000 + Math.random() * 9000);
  }
}
