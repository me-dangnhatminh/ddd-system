import { IEvent } from '@nestjs/cqrs';
import { User } from '../user';

export class UserLoggedEvent implements IEvent {
  constructor(public readonly user: User) {}
}
