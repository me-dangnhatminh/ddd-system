import * as NestCQRS from '@nestjs/cqrs';
import { UserRole } from '../user-role';

export class RegisteredUserEvent implements NestCQRS.IEvent {
  public readonly id: string;
  public readonly email: string;
  public readonly name: string;
  public readonly role: UserRole;
  public readonly registeredAt: Date;
  constructor(data: {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    registeredAt: Date;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.role = data.role;
    this.registeredAt = data.registeredAt;
  }
}
