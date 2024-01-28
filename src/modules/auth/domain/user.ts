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
  isLogged: boolean;
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

  get isLogged(): boolean {
    return this._isLogged;
  }

  get permissions(): UserPermissions {
    if (this.role === UserRole.ADMIN)
      return new UserPermissions(true, true, true);
    return new UserPermissions(false, false, false);
  }
  //! ======================[ Protected methods ]====================== !//

  protected constructor(private props: IUserProps) {
    super();
    this.autoCommit = false;
  }

  protected onUserCreatedEvent(event: UserCreatedEvent) {
    console.log(`User Create with name: ${event.user.fullname}`);
  }

  //! ======================[ Private methods ]====================== !//

  private removeUserByAdmin(user: User): void {
    user.validate({ ignoreLogin: true });
    user.props.removedAt = new Date();
    user.apply(new UserDeletedEvent(user.id));
  }

  /**
   * The `validate` function checks various conditions related to user authentication and data validity,
   * throwing exceptions if any of the conditions are not met.
   * @param opts - The `opts` parameter is an object that contains two optional properties:
   * @param opts.ignoreRemoved - The `ignoreRemoved` property is a boolean value that indicates whether
   * the function should ignore the "removed" status of the user.
   * @param opts.ignoreLogin - The `ignoreLogin` property is a boolean value that indicates whether the
   * function should ignore the "logged" status of the user.
   * @throws {PermissionDeniedException} If the user is not logged in.
   * @throws {UserNotFoundException} If the user is removed.
   * @throws {NameInvalidException} If the user's first or last name is invalid.
   * @throws {EmailInvalidException} If the user's email is invalid.
   * @throws {PasswordInvalidException} If the user's password is invalid.
   * @returns void - The `validate` function does not return anything.
   */
  private validate(
    opts: { ignoreRemoved?: boolean; ignoreLogin?: boolean } = {
      ignoreRemoved: false,
      ignoreLogin: false,
    },
  ) {
    if (!this._isLogged && !opts.ignoreLogin)
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

  //! ======================[ Static methods ]====================== !//

  /**
   * Creates a new User instance.
   * @param props - The properties to create a new user.
   * @returns The newly created user.
   */
  static new = (props: IUserProps): User => new User(props);

  /**
   * The function creates a new User object with the provided properties and returns it.
   * @param {ICreateUserProps} props - The `props` parameter is an object that contains the following
   * properties:
   * @returns The `create` method returns an instance of the `User` class.
   */
  static create(props: ICreateUserProps): User {
    const user = User.new({
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
    user.validate({ ignoreRemoved: true, ignoreLogin: true });
    user.apply(new UserCreatedEvent(user));
    return user;
  }

  /**
   * The function "validateEmail" checks if a given email string matches a regular expression for email
   * validation.
   * @param {string} email - The email parameter is a string that represents an email address.
   * @returns a boolean value.
   */
  static validateEmail(email: string): boolean {
    return ValidationRules.EMAIL_VALIDATION_REGEXP.test(email);
  }

  /**
   * The function "validateName" checks if a given name matches a specific regular expression pattern.
   * @param {string} name - The parameter "name" is a string that represents a name.
   * @returns a boolean value.
   */
  static validateName(name: string): boolean {
    return ValidationRules.NAME_VALIDATION_REGEXP.test(name);
  }
  /**
   * The function "validatePassword" checks if a given password matches a specific regular expression
   * pattern.
   * @param {string} password - The `password` parameter is a string that represents the password that
   * needs to be validated.
   * @returns a boolean value.
   */
  static validatePassword(password: string): boolean {
    return ValidationRules.PASSWORD_VALIDATION_REGEXP.test(password);
  }

  //! ======================[ Public methods ]====================== !//

  removeUser(user: User): void {
    if (this.role !== UserRole.ADMIN)
      throw new PermissionDeniedException(MESSAGES.PERMISSION_DENIED);
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

  /**
   * Updates the properties of a user. Only an admin can update a user.
   * @param data - The properties to update the user with.
   * @throws {PermissionDeniedException} If the requester is not an admin.
   * @returns The updated user.
   */
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
    this.validate({ ignoreLogin: true });
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

  //! ======================[ Event methods ]====================== !//
  onUserDeletedEvent() {
    this.props.removedAt = new Date();
  }

  onUserLoggedEvent() {
    this._isLogged = true;
  }

  onPasswordChangedEvent() {}

  onUserUpdatedEvent() {
    this.props.updatedAt = new Date();
  }
}
