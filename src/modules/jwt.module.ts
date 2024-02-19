import * as NestJWT from '@nestjs/jwt';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [
    NestJWT.JwtModule.register({
      secret: 'secretKey', //TODO: Change secret key
      signOptions: { expiresIn: '10 days' },
    }),
  ],
  exports: [NestJWT.JwtModule],
})
export class JwtModule {}
