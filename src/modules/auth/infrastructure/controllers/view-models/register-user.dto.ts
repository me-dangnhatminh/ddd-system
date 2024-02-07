import { IsEmail, IsString, Matches, Max, Min } from 'class-validator';
import { INVALID_PASSWORD, UserName, UserPassword } from '../../../domain';

export class RegisterUserBody {
  @IsString()
  @Min(UserName.MIN_LENGTH)
  @Max(UserName.MAX_LENGTH)
  firstName: string;

  @IsString()
  @Min(UserName.MIN_LENGTH)
  @Max(UserName.MAX_LENGTH)
  lastName: string;

  @IsString() @IsEmail() email: string;

  @IsString()
  @Matches(UserPassword.PASSWORD_REGEX, { message: INVALID_PASSWORD.message })
  password: string;
}
