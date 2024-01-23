import { AggregateRoot } from '@nestjs/cqrs';
import { Entity } from '../common/entity';
import { UserName } from './user-name';
import { UserPassword } from './user-password';
import { UserRole } from './user-role';

export interface IUserProps {
  name: UserName;
  email: string;
  password: UserPassword;
  role: UserRole;
  isAuthenticated: boolean;
}

export class User extends AggregateRoot {
  private constructor(protected readonly props: IUserProps) {
    super();
  }

  public create(user: IUserProps): User {
    return new User(user);
  }
}
