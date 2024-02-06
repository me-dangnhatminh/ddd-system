import { IEvent } from '@nestjs/cqrs';

export class LoggedInUserEvent implements IEvent {
  constructor(public readonly id: string) {}
}
