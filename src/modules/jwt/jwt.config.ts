import { IsNotEmpty } from 'class-validator';
import { env } from 'process';

export class JwtConfig {
  @IsNotEmpty() JWT_SECRET_KEY = String(env.JWT_SECRET_KEY ?? '');
  @IsNotEmpty() JWT_EXPIRES_IN = String(env.JWT_EXPIRES_IN ?? '');
}
