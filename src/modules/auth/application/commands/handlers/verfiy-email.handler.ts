import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { Cache } from '@nestjs/cache-manager';
import { Either, left, right } from 'fp-ts/lib/Either';

import { ErrorTypes, IErrorDetail } from '@common';
import { VerifyEmailCommand } from '../verify-email.command';
import { UserRepository } from '../../../domain';

const INVALID_CODE: IErrorDetail = {
  type: ErrorTypes.INVALID_PARAMETER,
  message: 'Invalid code',
};

const EXPIRED_CODE: IErrorDetail = {
  type: ErrorTypes.INVALID_PARAMETER,
  message: 'Expired code',
};

@CommandHandler(VerifyEmailCommand)
export class VerifyEmailHandler implements ICommandHandler<VerifyEmailCommand> {
  constructor(
    @Inject('CACHE_MANAGER') private readonly cacheService: Cache,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(
    command: VerifyEmailCommand,
  ): Promise<Either<IErrorDetail, void>> {
    const { requester } = command;
    const isVerified = requester.isVerified;
    if (isVerified) return left(INVALID_CODE);

    const codeExits = await this.cacheService.get(
      `verify-email:${requester.email}`,
    );
    if (!codeExits) return left(EXPIRED_CODE);
    if (codeExits !== command.code) return left(INVALID_CODE);

    requester.verifyEmail();
    await this.userRepository.save(requester);
    return right(undefined);
  }
}
