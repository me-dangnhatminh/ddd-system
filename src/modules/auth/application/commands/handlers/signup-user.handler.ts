import { User, UserRepository } from '../../../domain';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SignUpUserCommand } from '../signup-user.command';
import { AuthErrors } from 'src/modules/auth/common';

@CommandHandler(SignUpUserCommand)
export class SignUpUserHandler implements ICommandHandler<SignUpUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly publisher: EventPublisher,
  ) {}
  async execute(command: SignUpUserCommand) {
    const { email } = command;
    const user = await this.userRepository.getUserByEmail(email);
    if (user) return AuthErrors.emailExits(email);
    const newUser = User.signUpUser(command);
    await this.userRepository.save(newUser);
    this.publisher.mergeObjectContext(newUser).commit();
  }
}
