import { left, right } from 'fp-ts/lib/Either';
import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { SignInUserCommand } from '../signin-user.command';
import {
  UserCacheService,
  SignedInUserEvent,
  UserRepository,
  UserClaim,
} from '../../../domain';
import { AuthErrors } from '../../../common';
import { JwtService } from '@nestjs/jwt';

@CommandHandler(SignInUserCommand)
export class SignInUserHandler implements ICommandHandler<SignInUserCommand> {
  constructor(
    @Inject('cache-service')
    private readonly userCacheService: UserCacheService,
    private readonly userRepository: UserRepository,
    private readonly publisher: EventPublisher,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: SignInUserCommand) {
    const user = await this.userRepository.getUserByEmail(command.email);
    if (!user) return left(AuthErrors.invalidCredentials());
    const valid = user.comparePassword(command.password);
    if (!valid) return left(AuthErrors.invalidCredentials());

    const email = user.email.value;
    const tokenClaims: UserClaim = {
      userId: user.id,
      email,
      role: user.role,
      isVerified: user.isVerified,
    };

    const token = this.jwtService.sign(tokenClaims, { expiresIn: '1h' }); //TODO: config expiresIn in env
    await this.userCacheService.setUserToken(email, token, 60 * 60 * 1000);

    const signedEvent = new SignedInUserEvent({ email: user.email.value });
    user.apply(signedEvent);

    this.publisher.mergeObjectContext(user).commit();
    return right(undefined);
  }
}
