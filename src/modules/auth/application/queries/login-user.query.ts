import { IQuery, IQueryResult } from '@nestjs/cqrs';

export class LoginUserQuery implements IQuery {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}

export class LoginUserQueryResult implements IQueryResult {
  constructor(public readonly assessToken: string) {}
}
