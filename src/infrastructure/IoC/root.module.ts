import { Module } from '@nestjs/common';

import { AuthModule } from './auth.module';
import { CqrsModule } from './cqrs.module';
import { PersistencesModule } from './persistences.module';
import { JwtModule } from './jwt.module';
import { EventStoreModule } from './esdb.module';
import { MailerModule } from './mailer.module';
import { CacheModule } from './cache.module';

@Module({
  imports: [
    PersistencesModule,
    JwtModule,
    CqrsModule,
    EventStoreModule,
    MailerModule,
    CacheModule,
    AuthModule,
  ],
})
export class RootModule {}
