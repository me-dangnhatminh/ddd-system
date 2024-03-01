import { ICommand } from '@nestjs/cqrs';

export class RegisterUserCommand implements ICommand {
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly email: string;
  public readonly password: string;

  constructor(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.password = data.password;
  }
}
