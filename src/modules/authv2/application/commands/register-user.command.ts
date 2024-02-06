import { ICommand } from '@nestjs/cqrs';
import { UserRole } from '../../domain';

export class RegisterUserCommand implements ICommand {
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly email: string;
  public readonly password: string;
  public readonly roles: UserRole[];

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    roles?: UserRole[],
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.roles = roles || [];
  }
}
