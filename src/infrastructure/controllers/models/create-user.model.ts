import * as UserModule from '@modules/auth';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
} from 'class-validator';

const nameRules = {
  reg: UserModule.ValidationRules.NAME_VALIDATION_REGEXP,
  mes: UserModule.MESSAGES.NAME_INVALID,
};

const passwordRules = {
  reg: UserModule.ValidationRules.PASSWORD_VALIDATION_REGEXP,
  mes: UserModule.MESSAGES.PASSWORD_INVALID,
};

export class CreateUserBody {
  @IsString()
  @Matches(nameRules.reg, { message: nameRules.mes })
  firstName: string;

  @IsString()
  @Matches(nameRules.reg, { message: nameRules.mes })
  lastName: string;

  @IsString() @IsEmail() email: string;

  @IsString()
  @Matches(passwordRules.reg, { message: passwordRules.mes })
  password: string;

  @IsString()
  @IsEnum(UserModule.UserRole)
  role: UserModule.UserRole;

  @IsString() @IsUrl() @IsOptional() avatarUrl?: string;
}

export class CreateUserResponse {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
  ) {}
}
