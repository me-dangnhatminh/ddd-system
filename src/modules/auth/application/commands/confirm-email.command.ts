import { ICommand } from '@nestjs/cqrs';

export class ConfirmEmailCommand implements ICommand {
  constructor(public readonly token: string) {}
}
