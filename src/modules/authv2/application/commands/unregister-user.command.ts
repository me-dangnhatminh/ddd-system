import { ICommand } from '@nestjs/cqrs';

export class UnregisterUserCommand implements ICommand {
  constructor(public readonly email: string) {}
}
