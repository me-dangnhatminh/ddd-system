import { AggregateRoot } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';

import { UserRole } from './user-role';
import { UserPermissions } from './user-permissions';
import {
  PasswordChangedEvent,
  UserCreatedEvent,
  UserDeletedEvent,
} from './events';
import {
  EmailInvalidException,
  NameInvalidException,
  PasswordInvalidException,
  PermissionDeniedException,
  UserNotFoundException,
} from './exceptions/user-exception';
import { AuthProvider } from './auth-provider';
import { UserUpdatedEvent } from './events/user-updated.event';

export const ValidationRules = {
  NAME_VALIDATION_REGEXP: /^[a-zA-Z0-9]{1,30}$/,
  PASSWORD_VALIDATION_REGEXP: /^[a-zA-Z0-9]{6,30}$/,
  EMAIL_VALIDATION_REGEXP: /^[a-zA-Z0-9]{1,30}$/,
};

export const MESSAGES = {
  NAME_INVALID: 'Name must be between 1 and 30 character',
  EMAIL_INVALID: 'Email must be between 1 and 30 characters',
  PASSWORD_INVALID: 'Password must be between 6 and 30 characters',
  USER_NOT_FOUND: 'User not found',
  USER_REMOVED: 'User already removed',
  NOT_LOGGED: 'User not logged',
  PERMISSION_DENIED: 'Permission denied',
};

export interface IUserProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  authProvider: AuthProvider;
  role: UserRole;
  isVerified: boolean;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date | null;
  removedAt: Date | null;
}

export interface IUser {
  isRemoved: boolean;
  permissions: UserPermissions;
}

export interface ICreateUserProps {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  authProvider?: AuthProvider;
  role?: UserRole;
  isVerified?: boolean;
  avatarUrl?: string;
  createdAt?: Date;
  updatedAt?: Date | null;
  removedAt?: Date | null;
}

export interface IUpdateUserProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: UserRole;
  avatarUrl?: string;
}

export class User extends AggregateRoot implements IUser {
  private _isLogged: boolean;

  get id(): string {
    return this.props.id;
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get fullname(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get authProvider(): AuthProvider {
    return this.props.authProvider;
  }

  get role(): UserRole {
    return this.props.role;
  }

  get isVerified(): boolean {
    return this.props.isVerified;
  }

  get avatarUrl(): string {
    return this.props.avatarUrl;
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

  get isRemoved(): boolean {
    return this.props.removedAt !== null;
  }

  get permissions(): UserPermissions {
    if (this.role === UserRole.ADMIN)
      return new UserPermissions(true, true, true);
    return new UserPermissions(false, false, false);
  }

  // --- Protected methods ---
  protected constructor(private props: IUserProps) {
    super();
    this.autoCommit = false;
  }

  protected onUserCreatedEvent(event: UserCreatedEvent) {
    console.log(`User Create with name: ${event.user.fullname}`);
  }

  // --- Private methods ---
  private removeUserByAdmin(user: User): void {
    user.props.removedAt = new Date();
    user.apply(new UserDeletedEvent(user.id));
  }

  private validate(
    opts: { ignoreRemoved?: boolean; ignoreLogged?: boolean } = {
      ignoreRemoved: false,
      ignoreLogged: false,
    },
  ) {
    if (!this._isLogged && !opts.ignoreLogged)
      new PermissionDeniedException(MESSAGES.NOT_LOGGED);
    if (this.isRemoved && !opts.ignoreRemoved)
      throw new UserNotFoundException(MESSAGES.USER_REMOVED);
    if (!User.validateName(this.firstName))
      throw new NameInvalidException(MESSAGES.NAME_INVALID);
    if (!User.validateName(this.lastName))
      throw new NameInvalidException(MESSAGES.NAME_INVALID);
    if (!User.validateEmail(this.email))
      throw new EmailInvalidException(MESSAGES.EMAIL_INVALID);
    if (!User.validatePassword(this.password))
      throw new PasswordInvalidException(MESSAGES.PASSWORD_INVALID);
  }

  // --- Static methods ---
  static create(props: ICreateUserProps): User {
    const user = new User({
      id: props.id ?? uuid(),
      firstName: props.firstName,
      lastName: props.lastName,
      email: props.email,
      password: props.password,
      authProvider: props.authProvider ?? AuthProvider.LOCAL,
      role: props.role ?? UserRole.USER,
      isVerified: props.isVerified ?? false,
      avatarUrl: props.avatarUrl ?? '',
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? null,
      removedAt: props.removedAt ?? null,
    });
    user.validate();
    user.apply(new UserCreatedEvent(user));
    return user;
  }

  static validateEmail(email: string): boolean {
    return ValidationRules.EMAIL_VALIDATION_REGEXP.test(email);
  }

  static validateName(name: string): boolean {
    return ValidationRules.NAME_VALIDATION_REGEXP.test(name);
  }

  static validatePassword(password: string): boolean {
    return ValidationRules.PASSWORD_VALIDATION_REGEXP.test(password);
  }

  // --- Public methods ---
  removeUser(user: User): void {
    this.removeUserByAdmin(user);
  }

  removeUsers(users: User[]): void {
    users.forEach((user) => this.removeUser(user));
  }

  createUser(props: ICreateUserProps): User {
    if (this.role !== UserRole.ADMIN)
      throw new PermissionDeniedException(MESSAGES.PERMISSION_DENIED);
    return User.create(props);
  }

  updateUser(user: User, data: IUpdateUserProps): void {
    if (this.role !== UserRole.ADMIN)
      throw new PermissionDeniedException(MESSAGES.PERMISSION_DENIED);
    user.updateMe(data);
  }

  updateMe(props: IUpdateUserProps): void {
    this.props.firstName = props.firstName ?? this.props.firstName;
    this.props.lastName = props.lastName ?? this.props.lastName;
    this.props.email = props.email ?? this.props.email;
    this.props.role = props.role ?? this.props.role;
    this.props.avatarUrl = props.avatarUrl ?? this.props.avatarUrl;
    this.props.updatedAt = new Date();
    this.validate({ ignoreRemoved: true });
    this.apply(new UserUpdatedEvent(this.id));
  }

  getPermissions(user: User = this): UserPermissions {
    if (user.id === this.id) return new UserPermissions(true, false, true);
    if (this.role === UserRole.ADMIN)
      return new UserPermissions(true, true, true);
    return new UserPermissions(false, false, false);
  }

  changePassword(oldPass: string, newPass: string): void {
    if (!this.comparePassword(oldPass))
      throw new PasswordInvalidException(MESSAGES.PASSWORD_INVALID);
    this.props.password = newPass;
    this.validate({ ignoreLogged: true });
    this.apply(new PasswordChangedEvent(this.id));
  }

  comparePassword(pass: string): boolean {
    return this.password === pass;
  }

  loggin(pass: string): void {
    if (!this.comparePassword(pass))
      throw new PasswordInvalidException(MESSAGES.PASSWORD_INVALID);
    this._isLogged = true;
  }
}
