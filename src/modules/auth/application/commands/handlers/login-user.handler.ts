import * as NestCQRS from '@nestjs/cqrs';
import * as NestJWT from '@nestjs/jwt';
import * as NestCache from '@nestjs/cache-manager';
import * as NestCommon from '@nestjs/common';

import * as Common from '../../../common';
import * as Domain from '../../../domain';
import { LoginUserCommand } from '../login-user.command';
import { left, right } from 'fp-ts/lib/Either';
import { TCommandResult } from '@common';

@NestCQRS.CommandHandler(LoginUserCommand)
export class LoginUserHandler
  implements NestCQRS.ICommandHandler<LoginUserCommand, TCommandResult>
{
  constructor(
    @NestCommon.Inject(NestCache.CACHE_MANAGER)
    private readonly cacheService: NestCache.Cache,
    private readonly jwtService: NestJWT.JwtService,
    private readonly userRepository: Domain.UserRepository,
  ) {}

  async execute(Command: LoginUserCommand) {
    const user = await this.userRepository.getUserByEmail(Command.email);

    if (!user) return left(Common.EMAIL_ALREADY_EXISTS);
    const isValid = user.comparePassword(Command.password);
    if (!isValid) return left(Common.EMAIL_ALREADY_EXISTS);

    const tokenClaims: Domain.UserClaim = {
      userId: user.id,
      email: user.email.value,
      role: user.role,
      isVerified: user.isVerified,
    };
    const cacheKey = Common.USER_TOKEN_CACHE_KEY_PREFIX`${user.email.value}`;
    const token = this.jwtService.sign(tokenClaims, { expiresIn: '1h' }); //TODO: config expiresIn in env
    await this.cacheService.set(cacheKey, token, 60 * 60 * 1000);
    return right(undefined);
  }
}
