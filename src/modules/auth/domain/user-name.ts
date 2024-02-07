import { IErrorDetail, ValueObject } from '@common';
import { Either, left, right } from 'fp-ts/lib/Either';
import { INVALID_FIRST_NAME, INVALID_LAST_NAME } from './user-errors';

export interface IUserNameProps {
  firstName: string;
  lastName: string;
}

export class UserName extends ValueObject<IUserNameProps> {
  static readonly MIN_LENGTH = 1;
  static readonly MAX_LENGTH = 20;

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
    if (
      firstName.length < UserName.MIN_LENGTH ||
      firstName.length > UserName.MAX_LENGTH
    )
      return left(INVALID_FIRST_NAME);

    if (
      lastName.length < UserName.MIN_LENGTH ||
      lastName.length > UserName.MAX_LENGTH
    )
      return left(INVALID_LAST_NAME);

    return right(new UserName({ firstName, lastName }));
  }
}
