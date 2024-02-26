import { TQueryResult } from '@common';
import { IQuery } from '@nestjs/cqrs';

export class GetProfileQuery implements IQuery {
  constructor(public readonly userId: string) {}
}

export class GetProfileQueryResult {
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

export type TGetProfileQueryResult = TQueryResult<GetProfileQueryResult>;
