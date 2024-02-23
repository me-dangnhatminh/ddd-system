import { AggregateRoot } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';

import * as Events from './events';

import { UserEmail } from './user-email';
import { UserName } from './user-name';
import { UserPassword } from './user-password';
import { UserRole } from './user-role';
import { AuthProvider } from './auth-provider';
import {
  QualifiedForEditProfileSpec,
  QualifiedForRegistrationAdminSpec,
} from './specs';

interface IUserProps {
  id: string;
  name: UserName;
  email: UserEmail;
  password: UserPassword;
  role: UserRole;
  authProvider: AuthProvider;
  isVerified: boolean;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date | null;
  removedAt: Date | null;
}

export interface IDataRegisterAsUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isVerified?: boolean;
  avatarUrl?: string;
}

export interface IDataRegisterUserAsAdmin extends IDataRegisterAsUser {
  role: UserRole;
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
  password: string;
  isVerified: boolean;
  role: UserRole;
  avatarUrl: string;
  authProvider: AuthProvider;
  createdAt: Date;
  updatedAt: Date | null;
  removedAt: Date | null;
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
  get password(): string {
    return this.props.password.value;
  }
  get role(): UserRole {
    return this.props.role;
  }
  get avatarUrl(): string {
    return this.props.avatarUrl;
  }
  get authProvider(): AuthProvider {
    return this.props.authProvider;
  }
  get isVerified(): boolean {
    return this.props.isVerified;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }
  get updatedAt(): Date | null {
    return this.props.updatedAt;
  }
  get removedAt(): Date | null {
    return this.props.removedAt;
  }

  get isAdmin(): boolean {
    return this.props.role === UserRole.ADMIN;
  }

  protected constructor(protected props: IUserProps) {
    super();
    this.autoCommit = false;
  }

  public static new = (props: IUserProps): User => new User(props);

  public static registerAsUser(data: IDataRegisterAsUser): User {
    const name = UserName.new(data.firstName, data.lastName);
    const email = UserEmail.new(data.email);
    const password = UserPassword.new(data.password);

    const user = new User({
      id: uuid(),
      name,
      email,
      password,
      role: UserRole.USER,
      isVerified: data.isVerified ?? false,
      createdAt: new Date(),
      avatarUrl: data.avatarUrl ?? '',
      removedAt: null,
      updatedAt: null,
      authProvider: AuthProvider.LOCAL,
    });

    user.apply(new Events.RegisteredUserEvent(user));
    return user;
  }

  /**
   * The function `registerAdmin` registers a user as an admin if the current user is qualified,
   * otherwise it throws an error.
   * @param {IDataRegisterUserAsAdmin} data - The `data` parameter in the `registerAdmin` function
   * contains the following properties:
   * @returns A User object is being returned from the registerAdmin function.
   */
  public registerAdmin(data: IDataRegisterUserAsAdmin): User {
    const qualified = new QualifiedForRegistrationAdminSpec();
    if (!qualified.isSatisfiedBy(this))
      throw new Error(
        'Only admin can register user as admin, can check @isAdmin property',
      );

    const name = UserName.new(data.firstName, data.lastName);
    const email = UserEmail.new(data.email);
    const password = UserPassword.new(data.password);
    const role = data.role;

    const user = new User({
      id: uuid(),
      name,
      email,
      password,
      role,
      isVerified: data.isVerified ?? false,
      createdAt: new Date(),
      avatarUrl: data.avatarUrl ?? '',
      removedAt: null,
      updatedAt: null,
      authProvider: AuthProvider.LOCAL,
    });

    user.apply(new Events.RegisteredUserEvent(user));
    return user;
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
      new Events.UnregisteredUserEvent({
        id: user.id,
        email: user.email,
        removedAt,
      }),
    );
  }

  public comparePassword(password: string): boolean {
    return this.props.password.compare(password);
  }

  public changePassword(password: string): void {
    this.props.password.changePassword(password);
    this.apply(new Events.PasswordChangedEvent(this.id));
  }

  /**
   * The `editProfile` function is used to edit the profile of a user.
   * Only the user itself can edit its profile or an admin can edit the profile of any user.
   * @param data
   * @param target
   */
  public editProfile(data: IDataEditProfile, target: User = this): void {
    const spec = new QualifiedForEditProfileSpec();
    if (!spec.isSatisfiedBy({ editer: this, target }))
      throw new Error(
        'Only the user itself can edit its profile or an admin can edit the profile of any user.',
      );

    if (data.firstName !== undefined && data.lastName !== undefined) {
      const name = UserName.new(data.firstName, data.lastName);
      this.props.name = name;
    }

    if (data.avatarUrl !== undefined) {
      this.props.avatarUrl = data.avatarUrl;
    }

    this.apply(new Events.ProfileEditedEvent(this));
  }

  public verifyEmail(): void {
    if (this.props.isVerified)
      throw new Error(
        'Conflic: Email already verified, please check @isVerified property',
      );
    this.props.isVerified = true;
    this.apply(new Events.EmailVerifiedEvent(this));
  }
}
