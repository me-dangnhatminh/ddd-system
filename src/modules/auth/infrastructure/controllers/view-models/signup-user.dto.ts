import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
} from 'class-validator';

export class EmailValidityChecksBody {
  @IsEmail() @IsNotEmpty() email: string;
}

export class PasswordValidityChecksBody {
  @IsString() @IsNotEmpty() password: string;
}

export class UsernameValidityChecksBody {
  @IsString() @IsNotEmpty() username;
}

export class SignUpUserBody {
  @IsEmail() @IsNotEmpty() email: string;
  @IsString() @IsNotEmpty() password: string;
  @IsString() @IsNotEmpty() username: string;
}

export class RequestEmailVerificationBody {
  @IsEmail() @IsNotEmpty() email: string;
}

export class ValidationEmailCodeBody {
  @IsNotEmpty()
  @IsNumberString()
  @Length(6, 6)
  code: string;

  @IsEmail() @IsNotEmpty() email: string;
}
