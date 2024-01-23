import { IEvent } from '@nestjs/cqrs';

export class PasswordChangedEvent implements IEvent {
  constructor(
    public readonly userId: string,
    public readonly password: string,
  ) {}
}
