import { IsString, IsEmail, Matches } from 'class-validator';
import { UserPassword, INVALID_PASSWORD } from '../../../domain';

export class LoginUserBody {
  @IsString() @IsEmail() email: string;

  @IsString()
  @Matches(UserPassword.PASSWORD_REGEX, { message: INVALID_PASSWORD.message })
  password: string;
}
