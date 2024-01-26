import { UserRole } from '../../domain';
import { ICommand } from '@nestjs/cqrs';
export class UpdateUserCommand implements ICommand {
  constructor(
    public readonly email: string,
    public readonly name?: string,
    public readonly role?: UserRole,
  ) {}
}
