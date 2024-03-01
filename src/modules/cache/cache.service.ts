import * as NestCache from '@nestjs/cache-manager';
import * as AuthModule from '../auth'; //TODO: dont use AuthModule in

export class CacheService
  extends NestCache.Cache
  implements AuthModule.CacheService
{
  getEmailVerificationCode(email: string): Promise<number | undefined> {
    throw new Error('Method not implemented.');
  }
  setEmailVerificationCode(
    email: string,
    code: number,
    ttl: number,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getUserToken(email: string): Promise<string | undefined> {
    throw new Error('Method not implemented.');
  }
  setUserToken(email: string, token: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
