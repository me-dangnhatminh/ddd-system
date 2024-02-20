import { IEvent } from '@nestjs/cqrs';

export class EmailVerifiedEvent implements IEvent {
  public readonly email: string;
  public readonly firstName: string;
  public readonly lastName: string;

  constructor(data: { email: string; firstName: string; lastName: string }) {
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
  }
}
