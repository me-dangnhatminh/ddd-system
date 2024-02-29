import * as NestCQRS from '@nestjs/cqrs';

import { IErrorDetail, TCommandResult } from '@common';
import * as Domain from '../../../domain';

import { ConfirmEmailCommand } from '../confirm-email.command';
import { left, right } from 'fp-ts/lib/Either';

const INVALID_CODE: IErrorDetail = {
  code: 'invalid_code',
  message: 'Invalid code or expired',
};

@NestCQRS.CommandHandler(ConfirmEmailCommand)
export class ConfirmEmailHandler
  implements NestCQRS.ICommandHandler<ConfirmEmailCommand, TCommandResult>
{
  constructor(
    private readonly cacheService: Domain.CacheService,
    private readonly userRepository: Domain.UserRepository,
    private readonly publisher: NestCQRS.EventPublisher,
  ) {}

  async execute(command: ConfirmEmailCommand) {
    const { email, code } = command;
    const savedCode = await this.cacheService.getEmailVerificationCode(email);
    if (!savedCode || savedCode !== code) return left([INVALID_CODE]);

    const user = await this.userRepository.getUserByEmail(email);
    if (!user) throw new Error('InvalidOperation: User not found');
    user.verifyEmail();
    await this.userRepository.update(user);
    this.publisher.mergeObjectContext(user).commit();
    return right(undefined);
  }
}
