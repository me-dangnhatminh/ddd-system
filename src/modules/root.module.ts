import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from './mailer/mailer.module';
import { JwtModule } from './jwt.module';
import { CqrsModule } from './cqrs.module';
import { CacheModule } from './cache.module';
import { PersistencesModule } from './persistences/persistences.module';

@Module({
  imports: [
    PersistencesModule,
    AuthModule,
    MailerModule,
    JwtModule,
    CqrsModule,
    CacheModule,
  ],
  providers: [],
})
export class RootModule {}
