import { IErrorDetail, ValueObject } from '@common';
import { Either, left, right } from 'fp-ts/Either';
import { INVALID_EMAIL } from './user-errors';

export interface IUserEmailProps {
  email: string;
}

export class UserEmail extends ValueObject<IUserEmailProps> {
  static readonly EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  get value(): string {
    return this.props.email;
  }

  private constructor(email: string) {
    super({ email });
  }

  static create(email: string): Either<IErrorDetail, UserEmail> {
    if (!UserEmail.EMAIL_REGEX.test(email)) return left(INVALID_EMAIL);
    return right(new UserEmail(email));
  }
}
