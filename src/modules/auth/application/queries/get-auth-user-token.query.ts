import { TQueryResult } from '@common';
import { IQuery } from '@nestjs/cqrs';

export class GetAuthUserTokenQuery implements IQuery {
  constructor(public readonly email: string) {}
}

export class GetAuthUserTokenQueryResult {
  constructor(public readonly accessToken) {}
}

export type TGetAuthUserTokenQueryResult =
  TQueryResult<GetAuthUserTokenQueryResult>;
