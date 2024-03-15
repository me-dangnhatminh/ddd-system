import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmailValidityChecksBody {
  @IsEmail() @IsNotEmpty() value: string;
}

export class PasswordValidityChecksBody {
  @IsNotEmpty() value: string;
}

export class SignUpUserBody {
  @IsEmail() @IsNotEmpty() email: string;
  @IsEmail() @IsNotEmpty() password: string;
}
