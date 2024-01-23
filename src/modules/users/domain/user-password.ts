import { Result } from '@common';

export interface IUserPasswordProps {
  value: string;
  hashed: boolean;
}

export class UserPassword {
  private constructor(private readonly props: IUserPasswordProps) {}

  static create(props: IUserPasswordProps): Result<UserPassword> {
    return Result.success(new UserPassword(props));
  }
}
