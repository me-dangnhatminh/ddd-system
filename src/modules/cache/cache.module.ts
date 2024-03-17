import * as NestCache from '@nestjs/cache-manager';
import { Module, Global } from '@nestjs/common';

@Global()
@Module({
  imports: [NestCache.CacheModule.register({ ttl: 3600, max: 1000 })],
  exports: [NestCache.CacheModule],
})
export class CacheModule {}
