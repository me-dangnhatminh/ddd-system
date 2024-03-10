import * as NestCQRS from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { left, right } from 'fp-ts/lib/Either';

import * as Domain from '../../../domain';
import * as Common from '../../../common';

import {
  GetAuthUserTokenQuery,
  GetAuthUserTokenQueryResult,
  TGetAuthUserTokenQueryResult,
} from '../get-auth-user-token.query';

@NestCQRS.QueryHandler(GetAuthUserTokenQuery)
export class GetAuthUserTokenHandler
  implements
    NestCQRS.IQueryHandler<GetAuthUserTokenQuery, TGetAuthUserTokenQueryResult>
{
  constructor(
    @Inject('cache-service')
    private readonly cacheService: Domain.CacheService,
  ) {}

  async execute(query: GetAuthUserTokenQuery) {
    const { email } = query;
    const token = await this.cacheService.getUserToken(email);
    if (!token) return left(Common.AuthSignInTokenInvalid);

    const result = new GetAuthUserTokenQueryResult(token);
    return right(result);
  }
}
