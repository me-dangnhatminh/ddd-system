import * as NestCommon from '@nestjs/common';
import * as NestCore from '@nestjs/core';

import * as Shared from '@shared';

import { AuthModule } from './auth/auth.module';
import { MailerModule } from './mailer/mailer.module';
import { JwtModule } from './jwt.module';
import { CqrsModule } from './cqrs.module';
import { CacheModule } from './cache/cache.module';
import { PersistencesModule } from './persistences/persistences.module';

const providers = [
  {
    provide: NestCore.APP_PIPE,
    useValue: new NestCommon.ValidationPipe({
      transform: true,
      exceptionFactory(errors) {
        const error: Shared.IValidationError = {
          type: Shared.CommonErrorType.VALIDATION_ERROR,
          title: "Your request parameters didn't validate.",
          detail: 'Check your request parameters again.',
          invalidParams: errors.map((error) => ({
            name: error.property,
            reason: Object.values(error.constraints ?? '').join(', '),
          })),
        };

        return new NestCommon.BadRequestException(error);
      },
    }),
  },
];

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
export class RootModule {}
