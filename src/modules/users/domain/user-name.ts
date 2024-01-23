import { Result } from '@common';

export interface IUserNameProps {
  name: string;
}

// value object
export class UserName {
  private constructor(private readonly props: IUserNameProps) {}

  static create(props: IUserNameProps): Result<UserName> {
    return Result.success(new UserName(props));
  }

  get name(): string {
    return this.props.name;
  }
}
