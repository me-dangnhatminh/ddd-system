import * as NestCache from '@nestjs/cache-manager';
import { Module, Provider } from '@nestjs/common';
import { CacheService } from './cache.service';

const CacheProvider: Provider = {
  useClass: CacheService,
  provide: CacheService,
};

@Module({
  imports: [
    NestCache.CacheModule.register({ isGlobal: true, ttl: 3600, max: 1000 }),
  ],
  providers: [CacheProvider],
  exports: [NestCache.CacheModule],
})
export class CacheModule {}
