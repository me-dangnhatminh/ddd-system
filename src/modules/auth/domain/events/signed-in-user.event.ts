import { IEvent } from '@nestjs/cqrs';

export class SignedInUserEvent implements IEvent {
  public readonly email: string;
  constructor(data: { email: string }) {
    this.email = data.email;
  }
}
