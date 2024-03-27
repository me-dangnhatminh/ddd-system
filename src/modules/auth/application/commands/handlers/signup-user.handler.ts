import { User, IUserRepository, IAuthService } from '../../../domain';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SignUpUserCommand } from '../signup-user.command';
import { AuthErrors } from 'src/modules/auth/common';
import { left, right } from 'fp-ts/lib/Either';

@CommandHandler(SignUpUserCommand)
export class SignUpUserHandler implements ICommandHandler<SignUpUserCommand> {
  constructor(
    private readonly authService: IAuthService,
    private readonly userRepository: IUserRepository,
    private readonly publisher: EventPublisher,
  ) {}
  async execute(command: SignUpUserCommand) {
    // validate user exits
    const exits = await this.userRepository.userExits(command);
    if (exits) return left(AuthErrors.userAlreadyExists());
    const newUser = User.signUpUser(command);
    await this.userRepository.save(newUser);

    // save auth token to cache
    await this.authService.genAndSaveAuthToken(newUser.toUserClaim());

    // send email verification code
    await this.authService.saveEmailVerifyClaim(newUser.toEmailVerifyClaim());

    // commit user to event store
    this.publisher.mergeObjectContext(newUser).commit();
    return right(undefined);
  }
}
