import { IQuery, IQueryResult } from '@nestjs/cqrs';
import { User } from '@prisma/client';

export class GetUserQuery implements IQuery {
  constructor(public readonly id: string) {}
}

export class GetUserQueryResult implements IQueryResult {
  constructor(public readonly user: User) {}
}
