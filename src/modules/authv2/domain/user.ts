import { AggregateRoot } from '@nestjs/cqrs';
import { Either, right, left } from 'fp-ts/Either';
import { v4 as uuid } from 'uuid';

import { IErrorDetail } from '@common';

import { UserEmail } from './user-email';
import { UserName } from './user-name';
import { UserPassword } from './user-password';
import { UserRole } from './user-role';
import {
  PasswordChangedEvent,
  ProfileEditedEvent,
  RegisteredUserEvent,
} from './events';
import { AuthProvider } from './auth-provider';
import { UnregisteredUserEvent } from './events/unregistered-user.event';

export interface IUserProps {
  id: string;
  name: UserName;
  email: UserEmail;
  password: UserPassword;
  role: UserRole;
  authProvider: AuthProvider;
  isVerified: boolean;
  avatarUrl: string;
  createdAt: Date;
  removedAt: Date | null;
}

export interface IDataRegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isVerified?: boolean;
  avatarUrl?: string;
}

export interface IDataRegisterUserByAdmin extends IDataRegisterUser {
  role?: UserRole;
}

export interface IDataEditProfile {
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  fullname: string;
  email: string;
  isVerified: boolean;
  role: UserRole;
  avatarUrl: string;
  createdAt: Date;
  authProvider: AuthProvider;
  comparePassword(password: string): boolean;
  changePassword(newPassword: string): void;
  editProfile(data: IDataEditProfile): void;
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
  get role(): UserRole {
    return this.props.role;
  }
  get isVerified(): boolean {
    return this.props.isVerified;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }
  get avatarUrl(): string {
    return this.props.avatarUrl;
  }
  get authProvider(): AuthProvider {
    return this.props.authProvider;
  }

  protected constructor(protected props: IUserProps) {
    super();
    this.autoCommit = false;
  }

  public static new = (props: IUserProps): User => new User(props);

  public static register(data: IDataRegisterUser): Either<IErrorDetail, User> {
    const nameResult = UserName.create(data.firstName, data.lastName);
    const emailResult = UserEmail.create(data.email);
    const passwordResult = UserPassword.create(data.password);

    if (nameResult._tag === 'Left') return left(nameResult.left);
    if (emailResult._tag === 'Left') return left(emailResult.left);
    if (passwordResult._tag === 'Left') return left(passwordResult.left);

    const user = new User({
      id: uuid(),
      name: nameResult.right,
      email: emailResult.right,
      password: passwordResult.right,
      role: UserRole.USER,
      isVerified: data.isVerified ?? false,
      createdAt: new Date(),
      avatarUrl: data.avatarUrl ?? '',
      removedAt: null,
      authProvider: AuthProvider.LOCAL,
    });

    this.apply(new RegisteredUserEvent(user));
    return right(user);
  }
  /**
   * Register user by admin, this method can only be called by admin user.
   * If you want to register user, use @register instead (check the role property to determine the user role)
   * @param data - Data to register user by admin
   * @returns Either<IErrorDetail, User>
   */
  public registerByAdmin(
    data: IDataRegisterUserByAdmin,
  ): Either<IErrorDetail, User> {
    if (this.props.role !== UserRole.ADMIN)
      throw new Error(
        'Register user by admin, this method can only be called by admin user. If you want to register user, use @register instead (check the role property to determine the user role)',
      );
    const nameResult = UserName.create(data.firstName, data.lastName);
    const emailResult = UserEmail.create(data.email);
    const passwordResult = UserPassword.create(data.password);

    if (nameResult._tag === 'Left') return left(nameResult.left);
    if (emailResult._tag === 'Left') return left(emailResult.left);
    if (passwordResult._tag === 'Left') return left(passwordResult.left);

    const user = new User({
      id: uuid(),
      name: nameResult.right,
      email: emailResult.right,
      password: passwordResult.right,
      role: data.role ?? UserRole.USER,
      isVerified: data.isVerified ?? false,
      createdAt: new Date(),
      avatarUrl: data.avatarUrl ?? '',
      removedAt: null,
      authProvider: AuthProvider.LOCAL,
    });

    this.apply(new RegisteredUserEvent(user));
    return right(user);
  }

  public registersByAdmin(
    data: IDataRegisterUserByAdmin[],
  ): Either<IErrorDetail[], User[]> {
    const users: User[] = [];
    const errors: IErrorDetail[] = [];
    for (const user of data) {
      const result = this.registerByAdmin(user);
      if (result._tag === 'Left') errors.push(result.left);
      else users.push(result.right);
    }
    if (errors.length > 0) return left(errors);
    return right(users);
  }

  public unregisterByAdmin(user: User): void {
    if (this.props.role !== UserRole.ADMIN)
      throw new Error(
        'Unregister user by admin, this method can only be called by admin user',
      );
    if (this.props.id === user.id)
      throw new Error('Admin cannot unregister itself');

    const removedAt = new Date();
    user.props.removedAt = removedAt;
    this.apply(
      new UnregisteredUserEvent({ id: user.id, email: user.email, removedAt }),
    );
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

  public editProfile(data: IDataEditProfile): Either<IErrorDetail, void> {
    if (data.firstName !== undefined) {
      const result = UserName.create(data.firstName, this.props.name.lastName);
      if (result._tag === 'Left') return left(result.left);
      this.props.name = result.right;
    }

    if (data.lastName !== undefined) {
      const result = UserName.create(this.props.name.firstName, data.lastName);
      if (result._tag === 'Left') return left(result.left);
      this.props.name = result.right;
    }

    if (data.avatarUrl !== undefined) {
      this.props.avatarUrl = data.avatarUrl;
    }

    this.apply(new ProfileEditedEvent(this));
    return right(undefined);
  }
}
