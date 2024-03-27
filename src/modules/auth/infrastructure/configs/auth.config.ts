import { IsNotEmpty } from 'class-validator';
const { env } = process;

export class AuthConfig {
  @IsNotEmpty() RESET_PASSWORD_URL = String(env.RESET_PASSWORD_URL);
  @IsNotEmpty() EMAIL_VERIFICATION_URL = String(env.EMAIL_VERIFICATION_URL);
}
