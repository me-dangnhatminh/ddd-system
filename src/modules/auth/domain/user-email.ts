import * as Shared from '@shared';

export interface IUserEmailProps {
  email: string;
}

export class UserEmail extends Shared.ValueObject<IUserEmailProps> {
  static readonly EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  static readonly INVALID_MESSAGE = 'Invalid email format.';

  get value(): string {
    return this.props.email;
  }

  private constructor(email: string) {
    super({ email });
  }

  static new(email: string): UserEmail {
    if (!this.validate(email)) throw new Error(this.INVALID_MESSAGE);
    return new UserEmail(email);
  }

  static validate(email: string): boolean {
    return UserEmail.EMAIL_REGEX.test(email);
  }
}
