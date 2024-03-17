import * as Shared from '@shared';

import { hashSync, genSaltSync, compareSync } from 'bcryptjs';

export interface UserPasswordProps {
  password: string;
  isHashed: boolean;
}

export class UserPassword extends Shared.ValueObject<UserPasswordProps> {
  static readonly PASSWORD_REGEX = /^[A-Za-z\d]{8,}$/;
  static readonly INVALID_MESSAGE =
    'password must be at least 8 characters long';

  get value(): string {
    return this.props.password;
  }

  get isHashed(): boolean {
    return this.props.isHashed;
  }

  protected constructor(password: string, isHashed) {
    super({ password, isHashed });
  }

  public static new(password: string, isHashed = false): UserPassword {
    if (!isHashed && !this.validate(password))
      throw new Error(UserPassword.INVALID_MESSAGE);

    const pass = isHashed ? password : hashSync(password, genSaltSync());
    return new UserPassword(pass, true);
  }

  public compare(password: string): boolean {
    return compareSync(password, this.props.password);
  }

  static validate(password: string): boolean {
    return UserPassword.PASSWORD_REGEX.test(password);
  }
}
