import { IEvent } from '@nestjs/cqrs';

export class EmailVerifiedEvent implements IEvent {
  public readonly email: string;
  public readonly name: string;

  constructor(data: { email: string; name: string }) {
    this.email = data.email;
    this.name = data.name;
  }
}
