import { Result, ValueObject } from '@common';

export interface IUserNameProps {
  firstName: string;
  lastName: string;
}

export class UserName extends ValueObject<IUserNameProps> {
  static readonly INVALID_FIRST_NAME =
    'First name must be greater than 0 and less than 8 characters';
  static readonly INVALID_LAST_NAME =
    'Last name must be greater than 0 and less than 8 characters';

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get fullName(): string {
    return `${this.props.firstName} ${this.props.lastName}`.trim();
  }

  private constructor(props: IUserNameProps) {
    super(props);
  }

  public static create(
    firstName: string,
    lastName: string,
  ): Result<UserName, string> {
    if (firstName.length > 0 && firstName.length <= 8)
      return Result.failure<string>(UserName.INVALID_FIRST_NAME);
    if (firstName.length > 0 && firstName.length <= 8)
      return Result.failure<string>(UserName.INVALID_FIRST_NAME);
    return Result.success<UserName>(new UserName({ firstName, lastName }));
  }
}
