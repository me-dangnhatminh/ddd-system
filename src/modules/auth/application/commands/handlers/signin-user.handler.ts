import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { left, right } from 'fp-ts/lib/Either';

import { IUserRepository } from '../../../domain';
import { AuthErrors } from '../../../common';
import { AuthService } from '../../auth.service';
import { SignInUserCommand } from '../signin-user.command';

@CommandHandler(SignInUserCommand)
export class SignInUserHandler implements ICommandHandler<SignInUserCommand> {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: IUserRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: SignInUserCommand) {
    const user = await this.userRepository.getUserByEmail(command.email);
    if (!user) return left(AuthErrors.invalidCredentials());
    const valid = user.comparePassword(command.password);
    if (!valid) return left(AuthErrors.invalidCredentials());

    await this.authService.genAndSaveAuthToken(user.toClaim());
    this.publisher.mergeObjectContext(user).commit();
    return right(undefined);
  }
}
