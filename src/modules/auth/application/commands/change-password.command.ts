import { ICommand } from '@nestjs/cqrs';

export class ChangePasswordCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly oldPassword: string,
    public readonly newPassword: string,
  ) {}
}
