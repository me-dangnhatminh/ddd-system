import { IEvent } from '@nestjs/cqrs';

export class RegisteredUserEvent implements IEvent {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly firstName: string,
    public readonly lastName: string,
  ) {}
}
