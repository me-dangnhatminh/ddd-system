import { ICommand } from '@nestjs/cqrs';
import { UserRole } from '../domain';
export class CreateUserCommand implements ICommand {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: UserRole,
  ) {}
}
