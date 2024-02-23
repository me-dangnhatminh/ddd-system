import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserName, UserPassword } from '../../../domain';
import * as Common from '../../../common';

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
    message: Common.INVALID_PASSWORD.message,
  })
  password: string;
}
