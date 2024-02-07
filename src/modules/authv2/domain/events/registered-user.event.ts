import { IEvent } from '@nestjs/cqrs';
import { UserRole } from '../user-role';

export class RegisteredUserEvent implements IEvent {
  public readonly id: string;
  public readonly email: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly role: UserRole;
  public readonly createdAt: Date;
  constructor(data: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    createdAt: Date;
  }) {
    this.id = data.id;
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.role = data.role;
    this.createdAt = data.createdAt;
  }
}
