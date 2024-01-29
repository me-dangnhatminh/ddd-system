import { ICommand } from '@nestjs/cqrs';
import { ICreateUserProps, User } from '../../domain';

export class CreateUsersCommand implements ICommand {
  constructor(
    public readonly requester: User,
    public readonly data: ICreateUserProps[],
  ) {}
}
