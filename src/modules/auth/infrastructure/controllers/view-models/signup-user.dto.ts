import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailValidityChecksBody {
  @IsEmail() @IsNotEmpty() value: string;
}

export class PasswordValidityChecksBody {
  @IsNotEmpty() value: string;
}

export class SignUpUserBody {
  @IsEmail() @IsNotEmpty() email: string;
  @IsString() @IsNotEmpty() password: string;
  @IsString() @IsNotEmpty() username: string;
}
