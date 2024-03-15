import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInUserBody {
  @IsEmail() @IsNotEmpty() email: string;
  @IsNotEmpty() password: string;
}
