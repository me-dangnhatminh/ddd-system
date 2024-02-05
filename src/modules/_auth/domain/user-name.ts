import { Result, ValueObject } from '@common';

export interface IUserNameProps {
  firstName: string;
  lastName: string;
}

export class UserName extends ValueObject<IUserNameProps> {
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
    if (firstName.length === 0)
      return Result.failure<string>('First name is required');
    if (lastName.length === 0)
      return Result.failure<string>('Last name is required');
    return Result.success<UserName>(new UserName({ firstName, lastName }));
  }
}
