import { ValueObject } from '@common';

export interface UserPasswordProps {
  password: string;
  isHashed?: boolean;
}

const INVALID_PASSWORD = 'Password must be at least 8 characters long';

export class UserPassword extends ValueObject<UserPasswordProps> {
  static readonly PASSWORD_REGEX = /^[A-Za-z\d]{8,}$/;
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
    if (!UserPassword.PASSWORD_REGEX.test(password))
      throw new Error(INVALID_PASSWORD);

    return new UserPassword(password);
  }

  public compare(plainTextPassword: string): boolean {
    return plainTextPassword === this.props.password;
  }

  public changePassword(newPassword: string): void {
    if (!UserPassword.PASSWORD_REGEX.test(newPassword))
      throw new Error(INVALID_PASSWORD);
    this.props.password = newPassword;
  }
}
