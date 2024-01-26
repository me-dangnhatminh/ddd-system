/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserCreatedEvent } from '@modules/user/domain/events';
import { IEventHandler, EventsHandler } from '@nestjs/cqrs';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHanlder implements IEventHandler<UserCreatedEvent> {
  async handle(event: UserCreatedEvent) {
    throw new Error('Method not implemented.');
  }
}
