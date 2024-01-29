import { IUpdateUserData, User } from '../../domain';
import { ICommand } from '@nestjs/cqrs';
export class UpdateUserCommand implements ICommand {
  constructor(
    public requester: User,
    public updatedUserId: string,
    public data: IUpdateUserData,
  ) {}
}
