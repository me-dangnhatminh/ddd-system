import { ICommand } from '@nestjs/cqrs';

export class VerifyPasswordResetTokenCommand implements ICommand {
  public readonly email: string;
  public readonly sid: string;
  public readonly password: string;
  constructor(params: { email: string; sid: string; password: string }) {
    this.email = params.email;
    this.sid = params.sid;
    this.password = params.password;
  }
}
