import { ICommand } from '@nestjs/cqrs';

export class RegisterUserCommand implements ICommand {
  public readonly email: string;
  public readonly password: string;
  public readonly roles: string[];

  constructor(email: string, password: string, roles?: string[]) {
    this.email = email;
    this.password = password;
    this.roles = roles ?? [];
  }
}
