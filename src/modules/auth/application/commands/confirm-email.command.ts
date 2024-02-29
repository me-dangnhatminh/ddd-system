import { ICommand } from '@nestjs/cqrs';

export class ConfirmEmailCommand implements ICommand {
  constructor(
    public readonly email: string,
    public readonly code: number,
  ) {}
}
