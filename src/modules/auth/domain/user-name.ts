import { ValueObject } from '@common';

export interface IUserNameProps {
  firstName: string;
  lastName: string;
}

export class UserName extends ValueObject<IUserNameProps> {
  static readonly MIN_LENGTH = 1;
  static readonly MAX_LENGTH = 20;
  static readonly INVALID_MESSAGE = `User name must be between ${UserName.MIN_LENGTH} and ${UserName.MAX_LENGTH} characters.`;

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

  static new(firstName: string, lastName: string): UserName {
    const formated = this.format(firstName, lastName);
    const fullName = formated.firstName + formated.lastName;
    if (!this.validate(fullName)) throw new Error(this.INVALID_MESSAGE);

    return new UserName(formated);
  }

  private static format(firstName: string, lastName: string): IUserNameProps {
    return {
      firstName: firstName ? firstName.trim() : '',
      lastName: lastName ? lastName.trim() : '',
    };
  }

  public static validate(name: string): boolean {
    return name.length >= this.MIN_LENGTH && name.length <= this.MAX_LENGTH;
  }
}
