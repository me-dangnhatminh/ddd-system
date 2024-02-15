import { IErrorDetail, ValueObject } from '@common';
import { Either, left, right } from 'fp-ts/Either';
import { INVALID_PASSWORD } from './user-errors';

export interface UserPasswordProps {
  password: string;
  isHashed?: boolean;
}

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

  public compare(plainTextPassword: string): boolean {
    return plainTextPassword === this.props.password;
  }

  public changePassword(
    newPassword: string,
  ): Either<IErrorDetail, UserPassword> {
    if (!UserPassword.PASSWORD_REGEX.test(newPassword))
      return left(INVALID_PASSWORD);
    return right(new UserPassword(newPassword));
  }

  public static create(password: string): Either<IErrorDetail, UserPassword> {
    if (!UserPassword.PASSWORD_REGEX.test(password))
      return left(INVALID_PASSWORD);
    return right(new UserPassword(password));
  }
}