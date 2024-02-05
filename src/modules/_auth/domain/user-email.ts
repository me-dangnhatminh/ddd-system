import { Result, ValueObject } from '@common';

export interface IUserEmailProps {
  email: string;
}

export class UserEmail extends ValueObject<IUserEmailProps> {
  static readonly EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  static readonly INVALID_EMAIL_MESSAGE = 'Email must be a valid email address';

  get value(): string {
    return this.props.email;
  }

  private constructor(email: string) {
    super({ email });
  }

  create(email: string): Result<UserEmail, string> {
    if (!UserEmail.EMAIL_REGEX.test(email))
      return Result.failure<string>(UserEmail.INVALID_EMAIL_MESSAGE);
    return Result.success<UserEmail>(new UserEmail(email));
  }
}
