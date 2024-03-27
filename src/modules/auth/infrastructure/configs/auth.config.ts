import { IsNotEmpty } from 'class-validator';
import { IAuthConfig } from '../../domain';
const { env } = process;

export class AuthConfig implements IAuthConfig {
  @IsNotEmpty() RESET_PASSWORD_URL = String(env.RESET_PASSWORD_URL);
  @IsNotEmpty() EMAIL_VERIFICATION_URL = String(env.EMAIL_VERIFICATION_URL);
}
