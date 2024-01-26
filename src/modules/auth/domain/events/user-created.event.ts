import { IEvent } from '@nestjs/cqrs';
import { User } from '../user';

export class UserCreatedEvent implements IEvent {
  constructor(public readonly user: User) {}
}
