import { v4 as uuid } from 'uuid';
import { AggregateRoot } from '@nestjs/cqrs';
import { Either, right, left } from 'fp-ts/Either';

import { UserEmail } from './user-email';
import { UserName } from './user-name';
import { UserPassword } from './user-password';
import { UserRole } from './user-role';
import { IErrorDetail } from '@common';
import { INVALID_ROLES } from './user-errors';
import { PasswordChangedEvent } from './events';

export interface IUserProps {
  id: string;
  name: UserName;
  email: UserEmail;
  password: UserPassword;
  roles: UserRole[];
  isVerified: boolean;
  createdAt: Date;
  removedAt: Date | null;
}

export interface IDataCreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: UserRole[];
  isVerified?: boolean;
}

export interface IDataEditProfile {
  firstName?: string;
  lastName?: string;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  fullname: string;
  email: string;
  isVerified: boolean;
  comparePassword(password: string): boolean;
  changePassword(oldPassword: string, newPassword: string): void;
}

export class User extends AggregateRoot implements IUser {
  get firstName(): string {
    return this.props.name.firstName;
  }
  get lastName(): string {
    return this.props.name.lastName;
  }
  get fullname(): string {
    return this.props.name.fullName;
  }
  get id(): string {
    return this.props.id;
  }
  get email(): string {
    return this.props.email.value;
  }
  get roles(): UserRole[] {
    return this.props.roles;
  }
  get isVerified(): boolean {
    return this.props.isVerified;
  }
  protected constructor(private props: IUserProps) {
    super();
    this.autoCommit = false;
  }

  public static new = (props: IUserProps): User => new User(props);

  public static create(data: IDataCreateUser): Either<IErrorDetail, User> {
    const nameResult = UserName.create(data.firstName, data.lastName);
    const emailResult = UserEmail.create(data.email);
    const passwordResult = UserPassword.create(data.password);

    if (nameResult._tag === 'Left') return left(nameResult.left);
    if (emailResult._tag === 'Left') return left(emailResult.left);
    if (passwordResult._tag === 'Left') return left(passwordResult.left);
    if (data.roles.length === 0) return left(INVALID_ROLES);

    const user = new User({
      id: uuid(),
      name: nameResult.right,
      email: emailResult.right,
      password: passwordResult.right,
      roles: data.roles,
      isVerified: data.isVerified ?? false,
      createdAt: new Date(),
      removedAt: null,
    });

    return right(user);
  }

  public comparePassword(password: string): boolean {
    return this.props.password.compare(password);
  }

  public changePassword(password: string): Either<IErrorDetail, void> {
    const result = this.props.password.changePassword(password);
    if (result._tag === 'Left') return left(result.left);
    this.props.password = result.right;
    this.apply(new PasswordChangedEvent(this.id));
    return right(undefined);
  }
}
