import * as NestCQRS from '@nestjs/cqrs';
import * as NestCommon from '@nestjs/common';
import { left, right } from 'fp-ts/lib/Either';

import * as Shared from '@shared';
import * as Domain from '../../../domain';

import { ConfirmEmailCommand } from '../confirm-email.command';
import { AuthErrors } from '../../../common';

@NestCQRS.CommandHandler(ConfirmEmailCommand)
export class ConfirmEmailHandler
  implements
    NestCQRS.ICommandHandler<ConfirmEmailCommand, Shared.TCommandResult>
{
  constructor(
    @NestCommon.Inject('cache-service')
    private readonly cacheService: Domain.CacheService,
    private readonly userRepository: Domain.UserRepository,
    private readonly publisher: NestCQRS.EventPublisher,
  ) {}

  async execute(command: ConfirmEmailCommand) {
    const { email, code } = command;
    const savedCode = await this.cacheService.getEmailVerificationCode(email);
    if (savedCode !== code) return left(AuthErrors.emailCodeInvalid());

    const user = await this.userRepository.getUserByEmail(email);
    if (!user) throw new Error('InvalidOperation: User not found');
    user.verifyEmail();
    await this.userRepository.update(user);
    this.publisher.mergeObjectContext(user).commit();
    return right(undefined);
  }
}
