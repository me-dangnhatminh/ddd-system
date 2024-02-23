import { ValueObject } from '@common';

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

  static new(email: string): UserEmail {
    if (!UserEmail.EMAIL_REGEX.test(email))
      throw new Error('Invalid email format');

    return new UserEmail(email);
  }
}
