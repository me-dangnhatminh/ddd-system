import { IEvent } from '@nestjs/cqrs';

export class SignedInUserEvent implements IEvent {
  public readonly id: string;
  public readonly email: string;
  public readonly role: string;
  public readonly isVerified: boolean;
  constructor(params: {
    id: string;
    email: string;
    role: string;
    isVerified: boolean;
  }) {
    this.id = params.id;
    this.email = params.email;
    this.role = params.role;
    this.isVerified = params.isVerified;
  }
}
