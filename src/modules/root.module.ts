import { BadRequestException, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from './mailer/mailer.module';
import { JwtModule } from './jwt.module';
import { CqrsModule } from './cqrs.module';
import { CacheModule } from './cache/cache.module';
import { PersistencesModule } from './persistences/persistences.module';
import { IErrorDetail, IErrorResponse } from '@common';

const providers = [
  {
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      transform: true,
      exceptionFactory(errors) {
        const errorResponse: IErrorResponse = {
          code: 400,
          message: 'Bad Request',
          detail: errors.map((error) => {
            const err: IErrorDetail = {
              code: `invalid.${error.property}`,
              message: Object.values(error.constraints ?? '').join(', '),
            };
            return err;
          }),
        };
        return new BadRequestException(errorResponse);
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
