import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../../domain/events';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHanlder implements IEventHandler<UserCreatedEvent> {
  async handle(event: UserCreatedEvent) {
    console.log('UserCreatedEvent', event);
  }
}
