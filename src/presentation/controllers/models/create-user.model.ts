import * as UserModule from '@modules/user';
import { IsEmail, IsEnum, IsString, Matches } from 'class-validator';

const nameRules = {
  reg: UserModule.ValidationRules.NAME_VALIDATION_REGEXP,
  mes: UserModule.ErrorMessages.NAME_INVALID_FORMAT,
};

const passwordRules = {
  reg: UserModule.ValidationRules.PASSWORD_VALIDATION_REGEXP,
  mes: UserModule.ErrorMessages.PASSWORD_INVALID_FORMAT,
};

export class CreateUserBody {
  @IsString()
  @Matches(nameRules.reg, { message: nameRules.mes })
  name: string;

  @IsString() @IsEmail() email: string;

  @IsString()
  @Matches(passwordRules.reg, { message: passwordRules.mes })
  password: string;

  @IsString()
  @IsEnum(UserModule.UserRole)
  role: UserModule.UserRole;
}
