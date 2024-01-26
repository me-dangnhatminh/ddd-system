import { UserRole } from '@modules/user';
import { ICommand } from '@nestjs/cqrs';

export class UpdateUserCommand implements ICommand {
  constructor(
    public readonly email: string,
    public readonly name?: string,
    public readonly role?: UserRole,
  ) {}
}
