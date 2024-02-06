import { ICommand } from '@nestjs/cqrs';
import { User } from '../../domain';

export class ChangePasswordCommand implements ICommand {
  constructor(
    public readonly requester: User,
    public readonly oldPassword: string,
    public readonly newPassword: string,
  ) {}
}
