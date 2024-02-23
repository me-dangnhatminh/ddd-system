import { IsString, IsEmail, Matches } from 'class-validator';
import { UserPassword } from '../../../domain';
import { INVALID_PASSWORD } from '../../../common';

export class LoginUserBody {
  @IsString() @IsEmail() email: string;

  @IsString()
  @Matches(UserPassword.PASSWORD_REGEX, { message: INVALID_PASSWORD.message })
  password: string;
}
