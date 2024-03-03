import * as NestCQRS from '@nestjs/cqrs';

import * as Domain from '../../../domain';

import { left, right } from 'fp-ts/lib/Either';

import {
  GetAuthUserTokenQuery,
  GetAuthUserTokenQueryResult,
  TGetAuthUserTokenQueryResult,
} from '../get-auth-user-token.query';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { TOKEN_EXPIRED } from '../../../common';

@NestCQRS.QueryHandler(GetAuthUserTokenQuery)
export class GetAuthUserTokenHandler
  implements
    NestCQRS.IQueryHandler<GetAuthUserTokenQuery, TGetAuthUserTokenQueryResult>
{
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheService: Domain.CacheService,
  ) {}

  async execute(query: GetAuthUserTokenQuery) {
    const { email } = query;
    const token = await this.cacheService.getUserToken(email);
    if (!token) return left(TOKEN_EXPIRED);

    const result = new GetAuthUserTokenQueryResult({ token });
    return right(result);
  }
}
