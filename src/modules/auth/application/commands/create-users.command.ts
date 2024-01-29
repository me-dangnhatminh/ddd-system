import { ICommand } from '@nestjs/cqrs';
import { ICreateUserData, User } from '../../domain';

export class CreateUsersCommand implements ICommand {
  constructor(
    public readonly requester: User,
    public readonly data: ICreateUserData[],
  ) {}
}
