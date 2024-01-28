import { IEvent } from '@nestjs/cqrs';

export class LoggedInEvent implements IEvent {
  constructor(public readonly userId: string) {}
}
