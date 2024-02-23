import { ValueObject } from '@common';

export interface IUserNameProps {
  firstName: string;
  lastName: string;
}

const INVALID_FIRST_NAME = 'Name must be between 1 and 20 characters';
const INVALID_LAST_NAME = 'Name must be between 1 and 20 characters';

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

  /**
   * Create a new UserName
   * @param firstName must be between 1 and 20 characters
   * @param lastName must be between 1 and 20 characters
   * @returns UserName
   */
  static new(firstName: string, lastName: string): UserName {
    if (
      firstName.length < UserName.MIN_LENGTH ||
      firstName.length > UserName.MAX_LENGTH
    )
      throw new Error(INVALID_FIRST_NAME);
    if (
      lastName.length < UserName.MIN_LENGTH ||
      lastName.length > UserName.MAX_LENGTH
    )
      throw new Error(INVALID_LAST_NAME);

    return new UserName({ firstName, lastName });
  }
}
