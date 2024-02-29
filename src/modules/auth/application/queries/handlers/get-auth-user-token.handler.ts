import * as NestCQRS from '@nestjs/cqrs';

import * as Domain from '../../../domain';
import * as Shared from '@common';

import { left, right } from 'fp-ts/lib/Either';

import {
  GetAuthUserTokenQuery,
  GetAuthUserTokenQueryResult,
  TGetAuthUserTokenQueryResult,
} from '../get-auth-user-token.query';

const TOKEN_EXPIRED: Shared.IErrorDetail = {
  code: 'token_expired',
  message: 'Token expired',
};

@NestCQRS.QueryHandler(GetAuthUserTokenQuery)
export class GetAuthUserTokenHandler
  implements
    NestCQRS.IQueryHandler<GetAuthUserTokenQuery, TGetAuthUserTokenQueryResult>
{
  constructor(private readonly cacheService: Domain.CacheService) {}

  async execute(query: GetAuthUserTokenQuery) {
    const { email } = query;
    const token = await this.cacheService.getUserToken(email);
    if (!token) return left([TOKEN_EXPIRED]);

    const result = new GetAuthUserTokenQueryResult({ token });
    return right(result);
  }
}
