import { IsString, IsEmail, Matches } from 'class-validator';
import { UserPassword } from '../../../domain';

export class LoginUserBody {
  @IsString() @IsEmail() email: string;

  @IsString()
  @Matches(UserPassword.PASSWORD_REGEX, {
    message: UserPassword.INVALID_MESSAGE,
  })
  password: string;
}
