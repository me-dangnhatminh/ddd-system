import { BadRequestException, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from './mailer/mailer.module';
import { JwtModule } from './jwt.module';
import { CqrsModule } from './cqrs.module';
import { CacheModule } from './cache/cache.module';
import { PersistencesModule } from './persistences/persistences.module';
import { CommonErrorType, IValidationError } from '@common';

const providers = [
  {
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      transform: true,
      exceptionFactory(errors) {
        const error: IValidationError = {
          type: CommonErrorType.VALIDATION_ERROR,
          title: "Your request parameters didn't validate.",
          detail: 'Check your request parameters again.',
          invalidParams: errors.map((error) => ({
            name: error.property,
            reason: Object.values(error.constraints ?? '').join(', '),
          })),
        };

        return new BadRequestException(error);
      },
    }),
  },
];

@Module({
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
