import { IEvent } from '@nestjs/cqrs';
import { User } from '../user';

export class CreatedUserEvent implements IEvent {
  constructor(public readonly user: User) {}
}
