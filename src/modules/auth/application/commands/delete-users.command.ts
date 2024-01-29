import { ICommand } from '@nestjs/cqrs';
import { User } from '../../domain';

export class DeleteUserCommand implements ICommand {
  constructor(
    public readonly requester: User,
    public readonly userIds: string[],
  ) {}
}
