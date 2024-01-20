import { Entity, Result } from '@common';
import { CreatedUserEvent } from './events';
import { DeletedUserEvent } from './events/deleted-user.event';
import { UserRole } from './user-role';

export interface IUserProps {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export class User extends Entity<string> {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _email: string;
  private readonly _password: string;
  private readonly _role: UserRole;

  private constructor(props: IUserProps) {
    super();
    this._id = props.id;
    this._name = props.name;
    this._email = props.email;
    this._password = props.password;
    this._role = props.role;
  }

  get id() {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get role(): UserRole {
    return this._role;
  }

  static create(props: IUserProps): Result<User> {
    const user = new User(props);
    this.apply(new CreatedUserEvent(user));
    return Result.success(user);
  }

  static delete(id: string): Result<undefined> {
    this.apply(new DeletedUserEvent(id));
    return Result.success();
  }
}
