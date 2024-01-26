import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { User } from '@modules/user';
import { CreateUserCommand } from '../create-user.command';
import { UserRepository } from '@modules/user/domain/interfaces';
import { UserCreatedEvent } from '@modules/user/domain/events';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(command: CreateUserCommand): Promise<User> {
    const { name, email, password, role } = command;
    const emailExists = await this.userRepository
      .getUserByEmail(email)
      .then((u) => Boolean(u));
    if (emailExists) throw new Error('Email already exists');

    const user = await this.userRepository
      .create({ name, email, password, role })
      .then((props) => {
        const u = User.create(props);
        if (!u.isSuccess()) throw new Error(u.error);
        return u.value;
      });

    user.apply(new UserCreatedEvent(user));
    user.commit();

    return user;
  }
}