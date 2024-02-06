import { ErrorTypes, IErrorDetail, ValueObject } from '@common';
import { Either, left, right } from 'fp-ts/lib/Either';

export interface IUserNameProps {
  firstName: string;
  lastName: string;
}

export const INVALID_FIRST_NAME: IErrorDetail = {
  type: ErrorTypes.INVALID_PARAMETER,
  message: 'First name must be greater than 0 and less than 8 characters',
};

export const INVALID_LAST_NAME: IErrorDetail = {
  type: ErrorTypes.INVALID_PARAMETER,
  message: 'Last name must be greater than 0 and less than 8 characters',
};

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

  static create(
    firstName: string,
    lastName: string,
  ): Either<IErrorDetail, UserName> {
    if (firstName.length < 1 || firstName.length > 8)
      return left(INVALID_FIRST_NAME);
    if (lastName.length < 1 || lastName.length > 8)
      return left(INVALID_LAST_NAME);
    return right(new UserName({ firstName, lastName }));
  }
}
