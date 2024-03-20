import { ICommand } from '@nestjs/cqrs';

export class VerifyPasswordResetTokenCommand implements ICommand {
  public readonly token: string;
  public readonly password: string;
  constructor(params: { token: string; password: string }) {
    this.token = params.token;
    this.password = params.password;
  }
}
