import { IEntity } from '@common/interfaces';
import { Result } from '@common';

import { CreatedUserEvent } from './events';
import { DeletedUserEvent } from './events/deleted-user.event';
import { UserRole } from './user-role';
import { v4 as uuid } from 'uuid';
import { AggregateRoot } from '@nestjs/cqrs';

export interface IUserProps {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export class User extends AggregateRoot implements IEntity<string> {
  private _id: string;
  private _name: string;
  private _email: string;
  private _password: string;
  private _role: UserRole;

  private constructor(props: IUserProps, id?: string) {
    super();
    this._id = id ?? uuid();
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

  static create(props: IUserProps, id?: string): Result<User> {
    const user = new User(props, id);
    user.apply(new CreatedUserEvent(user));
    return Result.success(user);
  }

  static delete(id: string): Result<undefined> {
    return Result.success();
  }

  private validate(): Result<undefined> {
    return Result.success();
  }
}
