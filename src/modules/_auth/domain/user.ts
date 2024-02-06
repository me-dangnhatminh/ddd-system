import { v4 as uuid } from 'uuid';

import { UserEmail } from './user-email';
import { UserName } from './user-name';
import { UserPassword } from './user-password';
import { UserRole } from './user-role';
import { AggregateRoot } from '@nestjs/cqrs';
import { Result } from '@common';

export interface IUserProps {
  id: string;
  name: UserName;
  email: UserEmail;
  password: UserPassword;
  roles: UserRole[];
  createdAt: Date;
  removedAt: Date | null;
}

export interface IDataCreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: string[];
}

export interface IUser {
  id: string;
  isLogged: boolean;
  login(email: string, password: string): Result<undefined, string>;
  logout(): void;
  changeName(name: UserName): void;
  changePassword(password: UserPassword): void;
}

export class User extends AggregateRoot implements IUser {
  private $isLogged: boolean;

  get id(): string {
    return this.props.id;
  }
  get isLogged(): boolean {
    return this.$isLogged;
  }

  protected constructor(private props: IUserProps) {
    super();
  }

  public static create(data: IDataCreateUser): Result<User, string> {
    const nameResult = UserName.create(data.firstName, data.lastName);
    const emailResult = UserEmail.create(data.email);
    const passwordResult = UserPassword.create(data.password);

    return new User({
      id: id ?? uuid(),
      name: data.name,
      email: UserEmail.new(props.email).getValue(),
      password: UserPassword.create(props.password).getValue(),
      roles: props.roles.map((role) => UserRole.create(role).getValue()),
      createdAt: new Date(),
      removedAt: null,
    });
  }

  login(password: string): Result<undefined, string> {
    this.$isLogged = true;
    const result = this.props.password.comparePassword(password);
    if (!result) return Result.failure('Invalid password');
    return Result.success(undefined);
  }
  logout(): void {
    this.$isLogged = false;
  }
  changeName(name: UserName): void {
    this.props.name = name;
  }
  changePassword(password: UserPassword): void {
    this.props.password = password;
    throw new Error('Method not implemented.');
  }
}
