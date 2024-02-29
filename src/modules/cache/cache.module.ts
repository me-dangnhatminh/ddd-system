import * as NestCache from '@nestjs/cache-manager';
import { Module, Provider, Global } from '@nestjs/common';
import { CacheService } from './cache.service';

const CacheProvider: Provider = {
  provide: NestCache.CACHE_MANAGER,
  useClass: CacheService,
};

@Global()
@Module({
  imports: [NestCache.CacheModule.register({ ttl: 3600, max: 1000 })],
  providers: [CacheProvider],
  exports: [NestCache.CacheModule],
})
export class CacheModule {}
