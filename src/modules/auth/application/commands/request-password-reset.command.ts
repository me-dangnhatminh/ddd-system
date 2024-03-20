import { ICommand } from '@nestjs/cqrs';

export class RequestPasswordResetCommand implements ICommand {
  public readonly email: string;
  constructor(params: { email: string }) {
    this.email = params.email;
  }
}
