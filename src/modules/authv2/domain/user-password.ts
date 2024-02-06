import { IErrorDetail, ValueObject } from '@common';
import { Either, left, right } from 'fp-ts/Either';
import { INVALID_PASSWORD } from './user-errors.constant';

export interface UserPasswordProps {
  password: string;
  isHashed?: boolean;
}

export class UserPassword extends ValueObject<UserPasswordProps> {
  static readonly PASSWORD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  get value(): string {
    return this.props.password;
  }

  get isHashed(): boolean {
    return this.props.isHashed ?? false;
  }

  protected constructor(password: string) {
    super({ password });
  }

  public comparePassword(plainTextPassword: string): boolean {
    return plainTextPassword === this.props.password;
  }

  public static create(password: string): Either<IErrorDetail, UserPassword> {
    if (!UserPassword.PASSWORD_REGEX.test(password))
      return left(INVALID_PASSWORD);
    return right(new UserPassword(password));
  }
}
