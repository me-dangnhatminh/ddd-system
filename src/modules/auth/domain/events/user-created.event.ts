import { IEvent } from '@nestjs/cqrs';
import { IUserProps } from '../user';

export class UserCreatedEvent implements IEvent {
  constructor(public readonly data: IUserProps) {}
}
