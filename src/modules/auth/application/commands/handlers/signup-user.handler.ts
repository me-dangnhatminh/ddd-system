import { User, IUserRepository } from '../../../domain';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SignUpUserCommand } from '../signup-user.command';
import { AuthErrors } from 'src/modules/auth/common';
import { left, right } from 'fp-ts/lib/Either';
import { AuthService } from '../../auth.service';

@CommandHandler(SignUpUserCommand)
export class SignUpUserHandler implements ICommandHandler<SignUpUserCommand> {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: IUserRepository,
    private readonly publisher: EventPublisher,
  ) {}
  async execute(command: SignUpUserCommand) {
    const exits = await this.userRepository.userExits(command);
    if (exits) return left(AuthErrors.userAlreadyExists());
    const newUser = User.signUpUser(command);
    await this.userRepository.save(newUser);

    await this.authService.genAndSaveAuthToken(newUser.toClaim());
    this.publisher.mergeObjectContext(newUser).commit();
    return right(undefined);
  }
}
