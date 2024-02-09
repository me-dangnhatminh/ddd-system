import * as NestCache from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    NestCache.CacheModule.register({ isGlobal: true, ttl: 3600, max: 1000 }),
  ],
  exports: [NestCache.CacheModule],
})
export class CacheModule {}
