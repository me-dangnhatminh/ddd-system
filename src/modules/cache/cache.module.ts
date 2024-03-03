import * as NestCache from '@nestjs/cache-manager';
import { Module, Provider, Global } from '@nestjs/common';
import { CacheService } from './cache.service';

const cacheProvider: Provider = {
  provide: 'cache-service',
  useClass: CacheService,
};

@Global()
@Module({
  imports: [NestCache.CacheModule.register({ ttl: 3600, max: 1000 })],
  providers: [cacheProvider],
  exports: [cacheProvider],
})
export class CacheModule {}
