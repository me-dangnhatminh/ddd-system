import { ICommand } from '@nestjs/cqrs';

export class SignUpUserCommand implements ICommand {
  public readonly email: string;
  public readonly password: string;
  public readonly username: string;
  constructor(data: { email: string; password: string; username: string }) {
    this.email = data.email;
    this.password = data.password;
    this.username = data.username;
  }
}
