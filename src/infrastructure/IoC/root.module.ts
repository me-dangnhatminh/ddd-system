import { Module } from '@nestjs/common';

import { AuthModule } from './auth.module';
import { CqrsModule } from './cqrs.module';
import { PersistencesModule } from './persistences.module';
import { JwtModule } from './jwt.module';
import { EventStoreModule } from './esdb.module';
import { MailerModule } from './mailer.module';
import { CacheModule } from './cache.module';

import { ExceptionFilter } from '../controllers/Interceptors';

// TODO: categorize this provider
const ExceptionFilterProvider = {
  provide: 'APP_FILTER',
  useClass: ExceptionFilter,
};

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
  providers: [ExceptionFilterProvider],
})
export class RootModule {}
