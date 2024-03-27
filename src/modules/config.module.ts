import { Module } from '@nestjs/common';
import * as NestConfig from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

import { AuthConfig } from '@modules/auth';
import { MailerConfig } from './mailer';
import { JwtConfig } from './jwt';

const registedConfigs: (new () => any)[] = [
  AuthConfig,
  MailerConfig,
  JwtConfig,
];

function validate(config: Record<string, unknown>) {
  for (const configClass of registedConfigs) {
    const instance = plainToInstance(configClass, config);
    const errors = validateSync(instance, { skipMissingProperties: false });
    if (errors.length) throw new Error(errors.toString());
  }
  return config;
}

@Module({
  imports: [
    NestConfig.ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate,
    }),
  ],
})
export class ConfigModule {}
