import { ICommand } from '@nestjs/cqrs';

export class VerifyEmailCodeCommand implements ICommand {
  public readonly email: string;
  public readonly code: string;

  constructor(params: { email: string; code: string }) {
    this.email = params.email;
    this.code = params.code;
  }
}
