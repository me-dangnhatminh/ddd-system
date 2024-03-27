import { IsNotEmpty, IsBoolean } from 'class-validator';
import { env } from 'process';

export class AppConfig {
  @IsNotEmpty() static NODE_ENV = String(env.NODE_ENV ?? '');
  @IsNotEmpty() static API_HOST = String(env.API_HOST ?? '');
  @IsNotEmpty() static API_PORT = Number(env.API_PORT ?? 0);
  @IsNotEmpty() static CORS_ORIGIN = String(env.CORS_ORIGIN ?? '');
  @IsNotEmpty() static CORS_METHOD = String(env.CORS_METHOD ?? '');
  @IsBoolean() static LOG_ENABLE = Boolean(env.LOG_ENABLE ?? false);
}
