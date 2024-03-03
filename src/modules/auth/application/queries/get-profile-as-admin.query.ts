import * as Shared from '@shared';
import { IQuery } from '@nestjs/cqrs';

export class GetProfileAsAdminQuery implements IQuery {
  constructor(public readonly userId: string) {}
}

export class GetProfileAsAdminQueryResult {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly role: string;
  readonly avatarUrl: string;
  constructor(data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    avatarUrl: string;
  }) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.role = data.role;
    this.avatarUrl = data.avatarUrl;
  }
}

export type TGetProfileAsAdminQueryResult =
  Shared.TQueryResult<GetProfileAsAdminQueryResult>;
