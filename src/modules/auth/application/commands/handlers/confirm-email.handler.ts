import * as NestCQRS from '@nestjs/cqrs';
import * as NestCommon from '@nestjs/common';
import * as NestCache from '@nestjs/cache-manager';
import * as Either from 'fp-ts/Either';

import * as Shared from '@common';
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
  ): Promise<Either.Either<Shared.IErrorDetail, void>> {
    const { code, requester } = command;
    const email = requester.email;

    // get the code from cache
    const codeKey = `verify-email:${email}`;
    const cachedCode = await this.cacheService.get(codeKey);

    // compare the code
    if (cachedCode !== code)
      return Either.left(Common.INVALID_EMAIL_VERIFICATION_CODE);
    requester.verifyEmail(); // TODO: Add event to the user entity
    await this.cacheService.del(codeKey);
    await this.userRepository.save(requester);

    // publish the event
    this.publisher.mergeObjectContext(requester).commit();
    return Either.right(undefined);
  }
}
