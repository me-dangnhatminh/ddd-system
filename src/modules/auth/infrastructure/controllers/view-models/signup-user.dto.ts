import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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
