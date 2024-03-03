import * as NestCache from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

import * as AuthModule from '../auth';

export const USER_TOKEN_CACHE_KEY_PREFIX = Object.freeze(
  (strings: TemplateStringsArray, value: string) => {
    return `user-token-cache-key:${value}`;
  },
);

@Injectable()
export class CacheService implements AuthModule.CacheService {
  constructor(
    @Inject(NestCache.CACHE_MANAGER)
    private readonly cacheManager: NestCache.Cache,
  ) {}

  async setEmailVerificationCode(
    email: string,
    code: number,
    ttl: number,
  ): Promise<void> {
    const key = USER_TOKEN_CACHE_KEY_PREFIX`${email}`;
    await this.cacheManager.set(key, code, ttl);
  }

  async getEmailVerificationCode(email: string): Promise<number | undefined> {
    const key = USER_TOKEN_CACHE_KEY_PREFIX`${email}`;
    const code = await this.cacheManager.get(key);
    if (!code) return undefined;
    if (typeof code !== 'number')
      throw new Error(
        'InvalidOperation: code must be a number, please check your cache or set method',
      );
    return code;
  }

  async getUserToken(email: string): Promise<string | undefined> {
    const key = `token:${email}`;
    const token = await this.cacheManager.get(key);
    if (!token) return undefined;
    if (typeof token !== 'string')
      throw new Error(
        'InvalidOperation: token must be a string, please check your cache or set method',
      );
    return token;
  }

  async setUserToken(email: string, token: string, ttl: number): Promise<void> {
    const key = `token:${email}`;
    await this.cacheManager.set(key, token, ttl);
  }
}
