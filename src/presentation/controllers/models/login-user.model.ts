import { LoginUserQuery } from '@modules/user/queries';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserBody implements LoginUserQuery {
  @IsString() @IsEmail() email: string;
  @IsString() @IsNotEmpty() password: string;
}
