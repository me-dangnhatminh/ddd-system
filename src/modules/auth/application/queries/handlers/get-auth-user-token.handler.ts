import * as NestCQRS from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { left, right } from 'fp-ts/lib/Either';

import * as Domain from '../../../domain';

import {
  GetAuthUserTokenQuery,
  GetAuthUserTokenQueryResult,
  TGetAuthUserTokenQueryResult,
} from '../get-auth-user-token.query';
import { AuthErrors } from '../../../common';

@NestCQRS.QueryHandler(GetAuthUserTokenQuery)
export class GetAuthUserTokenHandler
  implements
    NestCQRS.IQueryHandler<GetAuthUserTokenQuery, TGetAuthUserTokenQueryResult>
{
  constructor(
    @Inject('cache-service')
    private readonly cacheService: Domain.UserCacheService,
  ) {}

  async execute(query: GetAuthUserTokenQuery) {
    const { email } = query;
    const token = await this.cacheService.getUserToken(email);
    if (!token) return left(AuthErrors.invalidSignInToken());

    const result = new GetAuthUserTokenQueryResult(token);
    return right(result.accessToken);
  }
}
