import { IEvent } from '@nestjs/cqrs';

export class UserUpdatedEvent implements IEvent {
  constructor(
    public readonly userId: string,
    public readonly data?: {
      firstName?: string;
      lastName?: string;
      avatarUrl?: string;
    },
  ) {}
}
