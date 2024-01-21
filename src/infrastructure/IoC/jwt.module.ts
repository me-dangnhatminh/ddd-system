import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [
    NestJwtModule.register({
      secret: 'secretKey', //TODO: Change secret key
      signOptions: { expiresIn: '10 days' },
    }),
  ],
  exports: [NestJwtModule],
})
export class JwtModule {}
