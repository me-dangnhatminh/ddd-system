import { IEvent } from '@nestjs/cqrs';

export class DeletedUserEvent implements IEvent {
  constructor(public readonly id: string) {}
}
