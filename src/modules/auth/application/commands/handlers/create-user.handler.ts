import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { User } from '../../../domain';
import { UserRepository } from '../../../domain/interfaces';
import { CreateUserCommand } from '../create-user.command';
import { IErrorDetail, Result } from '@common';
import { UserErrors } from '../../common/user-errors';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(
    command: CreateUserCommand,
  ): Promise<Result<User, IErrorDetail>> {
    const { requester, data } = command;

    const u = await this.userRepository.getOneByEmail(data.email);
    if (u) return Result.failure<IErrorDetail>(UserErrors.USER_ALREADY_EXISTS);

    const newUser = requester.createUser(data);
    await this.userRepository.save(newUser);
    newUser.commit();

    return Result.success(newUser);
  }
}
