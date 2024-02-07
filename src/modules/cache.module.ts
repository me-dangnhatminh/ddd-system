import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

@Module({
  imports: [NestCacheModule.register({ isGlobal: true, ttl: 3600, max: 1000 })],
  exports: [NestCacheModule],
})
export class CacheModule {}
