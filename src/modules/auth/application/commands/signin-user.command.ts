import { ICommand } from '@nestjs/cqrs';

export class SignInUserCommand implements ICommand {
  public readonly email: string;
  public readonly password: string;
  constructor(data: { email: string; password: string }) {
    this.email = data.email;
    this.password = data.password;
  }
}
