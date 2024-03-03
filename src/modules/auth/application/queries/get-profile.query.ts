import * as NestCQRS from '@nestjs/cqrs';

import * as Shared from '@shared';

export class GetProfileQuery implements NestCQRS.IQuery {
  constructor(public readonly userId: string) {}
}

export class GetProfileQueryResult {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
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
    this.avatarUrl = data.avatarUrl;
  }
}

export type TGetProfileQueryResult = Shared.TQueryResult<GetProfileQueryResult>;
