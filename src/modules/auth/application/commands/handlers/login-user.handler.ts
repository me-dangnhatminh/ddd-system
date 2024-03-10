import * as NestCQRS from '@nestjs/cqrs';
import * as NestJWT from '@nestjs/jwt';
import * as NestCommon from '@nestjs/common';
import { left, right } from 'fp-ts/lib/Either';

import * as Shared from '@shared';
import * as Common from '../../../common';
import * as Domain from '../../../domain';

import { LoginUserCommand } from '../login-user.command';

@NestCQRS.CommandHandler(LoginUserCommand)
export class LoginUserHandler
  implements NestCQRS.ICommandHandler<LoginUserCommand, Shared.TCommandResult>
{
  constructor(
    @NestCommon.Inject('cache-service')
    private readonly cacheService: Domain.CacheService,
    private readonly jwtService: NestJWT.JwtService,
    private readonly userRepository: Domain.UserRepository,
  ) {}

  async execute(Command: LoginUserCommand) {
    const user = await this.userRepository.getUserByEmail(Command.email);

    if (!user) return left(Common.AuthInvalidCredentials);
    const isValid = user.comparePassword(Command.password);
    if (!isValid) return left(Common.AuthInvalidCredentials);

    const email = user.email.value;
    const tokenClaims: Domain.UserClaim = {
      userId: user.id,
      email,
      role: user.role,
      isVerified: user.isVerified,
    };

    const token = this.jwtService.sign(tokenClaims, { expiresIn: '1h' }); //TODO: config expiresIn in env
    await this.cacheService.setUserToken(email, token, 60 * 60 * 1000);
    return right(undefined);
  }
}
