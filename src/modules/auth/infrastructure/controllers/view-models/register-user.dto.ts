import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserName, UserPassword } from '../../../domain';

export class RegisterUserBody {
  @IsString()
  @MinLength(UserName.MIN_LENGTH)
  @MaxLength(UserName.MAX_LENGTH)
  firstName: string;

  @IsString()
  @MinLength(UserName.MIN_LENGTH)
  @MaxLength(UserName.MAX_LENGTH)
  lastName: string;

  @IsString() @IsEmail() email: string;

  @IsString()
  @Matches(UserPassword.PASSWORD_REGEX, {
    message: 'Invalid password!', //TODO: move to common
  })
  password: string;
}
