import { Result, ValueObject } from '@common';

export interface UserPasswordProps {
  password: string;
  isHashed?: boolean;
}

export class UserPassword extends ValueObject<UserPasswordProps> {
  static readonly PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  static readonly INVALID_PASSWORD_MESSAGE = `Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number`;

  get value(): string {
    return this.props.password;
  }

  get isHashed(): boolean {
    return this.props.isHashed ?? false;
  }

  private constructor(password: string) {
    super({ password });
  }

  public comparePassword(plainTextPassword: string): boolean {
    return plainTextPassword === this.props.password;
  }

  public static create(password: string): Result<UserPassword, string> {
    if (!UserPassword.PASSWORD_REGEX.test(password))
      return Result.failure<string>(UserPassword.INVALID_PASSWORD_MESSAGE);
    return Result.success<UserPassword>(new UserPassword(password));
  }
}
