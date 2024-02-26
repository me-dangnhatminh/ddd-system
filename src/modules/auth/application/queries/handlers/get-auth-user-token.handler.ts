import * as NestCache from '@nestjs/cache-manager';
import * as NestCommon from '@nestjs/common';
import * as NestCQRS from '@nestjs/cqrs';
import * as NestJWT from '@nestjs/jwt';

import { IErrorDetail, Result } from '@common';
import * as Common from '../../../common';

import {
  GetAuthUserTokenQuery,
  GetAuthUserTokenQueryResult,
  TGetAuthUserTokenQueryResult,
} from '../get-auth-user-token.query';

const TOKEN_NOT_FOUND: IErrorDetail = {
  reason: 'token.not-found',
  message: 'Token not found.',
};

@NestCQRS.QueryHandler(GetAuthUserTokenQuery)
export class GetAuthUserTokenHandler
  implements
    NestCQRS.IQueryHandler<GetAuthUserTokenQuery, TGetAuthUserTokenQueryResult>
{
  constructor(
    @NestCommon.Inject(NestCache.CACHE_MANAGER)
    private readonly cacheService: NestCache.Cache,
    private readonly jwtService: NestJWT.JwtService,
  ) {}

  async execute(query: GetAuthUserTokenQuery) {
    const { email } = query;
    const cacheKey = Common.USER_TOKEN_CACHE_KEY_PREFIX`${email}`;
    const token = await this.cacheService.get(cacheKey);
    if (!token) return Result.failure([TOKEN_NOT_FOUND]);
    if (typeof token !== 'string')
      throw new Error('InvalidOperation: token is not a string.');

    const result = new GetAuthUserTokenQueryResult({ token });
    return Result.success<GetAuthUserTokenQueryResult>(result);
  }
}
