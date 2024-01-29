import { ICommand } from '@nestjs/cqrs';
import { ICreateUserData, User } from '../../domain';
export class CreateUserCommand implements ICommand {
  constructor(
    public readonly requester: User,
    public readonly data: ICreateUserData,
  ) {}
}
