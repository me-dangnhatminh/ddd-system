import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from './mailer/mailer.module';
import { JwtModule } from './jwt.module';
import { CqrsModule } from './cqrs.module';
import { CacheModule } from './cache.module';
import { PersistencesModule } from './persistences/persistences.module';

const providers = [
  {
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      transform: true,
      exceptionFactory(errors) {
        const detail = errors.map((error) => {
          return {
            type: `invalid_${error.property}`,
            message: Object.values(error.constraints ?? '').join(', '),
          };
        });

        return { code: 400, message: 'Bad Request', detail };
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
