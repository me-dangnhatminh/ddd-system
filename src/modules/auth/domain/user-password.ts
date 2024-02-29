import { ValueObject } from '@common';

export interface UserPasswordProps {
  password: string;
  isHashed?: boolean;
}

export class UserPassword extends ValueObject<UserPasswordProps> {
  static readonly PASSWORD_REGEX = /^[A-Za-z\d]{8,}$/;
  static readonly INVALID_MESSAGE =
    'Password must be at least 8 characters long';

  get value(): string {
    return this.props.password;
  }

  get isHashed(): boolean {
    return this.props.isHashed ?? false;
  }

  protected constructor(password: string) {
    super({ password });
  }
  /**
   * Create a new UserPassword
   * @param password must be at least 8 characters long
   * @returns UserPassword
   */
  public static new(password: string): UserPassword {
    if (!this.validate(password)) throw new Error(UserPassword.INVALID_MESSAGE);
    return new UserPassword(password);
  }

  public compare(plainTextPassword: string): boolean {
    return plainTextPassword === this.props.password;
  }

  static validate(password: string): boolean {
    return UserPassword.PASSWORD_REGEX.test(password);
  }
}
