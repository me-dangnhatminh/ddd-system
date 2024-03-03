import * as NestCQRS from '@nestjs/cqrs';

import { TCommandResult } from '@common';
import * as Domain from '../../../domain';

import { ConfirmEmailCommand } from '../confirm-email.command';
import { left, right } from 'fp-ts/lib/Either';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import * as Common from '../../../common';

@NestCQRS.CommandHandler(ConfirmEmailCommand)
export class ConfirmEmailHandler
  implements NestCQRS.ICommandHandler<ConfirmEmailCommand, TCommandResult>
{
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheService: Domain.CacheService,
    private readonly userRepository: Domain.UserRepository,
    private readonly publisher: NestCQRS.EventPublisher,
  ) {}

  async execute(command: ConfirmEmailCommand) {
    const { email, code } = command;
    const savedCode = await this.cacheService.getEmailVerificationCode(email);
    if (!savedCode || savedCode !== code)
      return left(Common.VERIFY_INVALID_CODE);

    const user = await this.userRepository.getUserByEmail(email);
    if (!user) throw new Error('InvalidOperation: User not found');
    user.verifyEmail();
    await this.userRepository.update(user);
    this.publisher.mergeObjectContext(user).commit();
    return right(undefined);
  }
}
