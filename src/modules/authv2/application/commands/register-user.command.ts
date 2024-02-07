import { ICommand } from '@nestjs/cqrs';
import { UserRole } from '../../domain';

export class RegisterUserCommand implements ICommand {
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly email: string;
  public readonly password: string;
  public readonly roles: UserRole[];

  constructor(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roles?: UserRole[];
  }) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.password = data.password;
    this.roles = data.roles || [];
  }
}
