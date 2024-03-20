import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { left, right } from 'fp-ts/lib/Either';

import { IAuthService, IUserRepository } from '../../../domain';
import { AuthErrors } from '../../../common';
import { SignInUserCommand } from '../signin-user.command';

@CommandHandler(SignInUserCommand)
export class SignInUserHandler implements ICommandHandler<SignInUserCommand> {
  constructor(
    private readonly authService: IAuthService,
    private readonly userRepository: IUserRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: SignInUserCommand) {
    const user = await this.userRepository.getUserByEmail(command.email);
    if (!user) return left(AuthErrors.invalidCredentials());
    const valid = user.comparePassword(command.password);
    if (!valid) return left(AuthErrors.invalidCredentials());

    await this.authService.genAndSaveAuthToken(user.toUserClaim());
    this.publisher.mergeObjectContext(user).commit();
    return right(undefined);
  }
}
