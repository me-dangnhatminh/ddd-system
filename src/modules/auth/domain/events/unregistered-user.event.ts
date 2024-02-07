import { IEvent } from '@nestjs/cqrs';

export class UnregisteredUserEvent implements IEvent {
  public readonly id: string;
  public readonly email: string;
  public readonly removedAt: Date;
  constructor(data: { id: string; email: string; removedAt: Date }) {
    this.id = data.id;
    this.email = data.email;
    this.removedAt = data.removedAt;
  }
}
