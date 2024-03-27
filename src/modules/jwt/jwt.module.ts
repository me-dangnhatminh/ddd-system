import * as NestJWT from '@nestjs/jwt';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtConfig } from './jwt.config';

@Global()
@Module({
  imports: [
    NestJWT.JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (jwtConfig: ConfigService<JwtConfig, true>) => {
        return {
          secret: jwtConfig.get('JWT_SECRET_KEY'),
          signOptions: { expiresIn: jwtConfig.get('JWT_EXPIRES_IN') },
        };
      },
    }),
  ],
  exports: [NestJWT.JwtModule],
})
export class JwtModule {}
