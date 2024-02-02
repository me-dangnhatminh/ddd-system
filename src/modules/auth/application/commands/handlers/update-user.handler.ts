import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdateUserCommand } from '../update-user.command';
import { UserRepository } from '../../../domain/interfaces';
import { IErrorDetail, Result } from '@common';
import { UserErrors } from '../../common/user-errors';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(
    command: UpdateUserCommand,
  ): Promise<Result<undefined, IErrorDetail>> {
    const { requester } = command;
    const user = await this.userRepository.getOneById(command.updatedUserId);
    if (!user) return Result.failure(UserErrors.USER_ALREADY_EXISTS);

    requester.updateUser(user, command.data);

    await this.userRepository.update(user);
    user.commit();

    return Result.success();
  }
}
