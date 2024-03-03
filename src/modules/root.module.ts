import * as NestCommon from '@nestjs/common';
import * as NestCore from '@nestjs/core';

import * as Shared from '@shared';

import { AuthModule } from './auth/auth.module';
import { MailerModule } from './mailer/mailer.module';
import { JwtModule } from './jwt.module';
import { CqrsModule } from './cqrs.module';
import { CacheModule } from './cache/cache.module';
import { PersistencesModule } from './persistences/persistences.module';

const validationPipeProvider: NestCommon.Provider = {
  provide: NestCore.APP_PIPE,
  useClass: Shared.ValidationPipe,
};

const exceptionFilterProvider: NestCommon.Provider = {
  provide: NestCore.APP_FILTER,
  useClass: Shared.ExceptionFilter,
};

const providers = [validationPipeProvider, exceptionFilterProvider];

@NestCommon.Module({
  imports: [
    CqrsModule,
    JwtModule,
    CacheModule,
    PersistencesModule,
    MailerModule,
    AuthModule,
  ],
  providers,
})
export class RootModule {
  constructor() {}

  configure(consumer: NestCommon.MiddlewareConsumer) {
    consumer.apply(Shared.FormatHttpResponseMiddleware).forRoutes('*');
  }
}
