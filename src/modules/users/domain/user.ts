import { AggregateRoot } from '@nestjs/cqrs';

import { UserName } from './user-name';
import { UserPassword } from './user-password';
import { UserRole } from './user-role';

export interface IUserProps {
  id: string;
  name: UserName;
  email: string;
  password: UserPassword;
  role: UserRole;
  isAuthenticated: boolean;
}

export class User extends AggregateRoot {
  private constructor(protected readonly props: IUserProps) {
    super();
    this.autoCommit = false;
  }

  public create(user: IUserProps): User {
    return new User(user);
  }
}
