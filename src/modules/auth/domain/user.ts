/* eslint-disable @typescript-eslint/no-unused-vars */
import { AggregateRoot } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';

import { UserRole } from './user-role';
import { UserPermissions } from './user-permissions';
import {
  PasswordChangedEvent,
  UserCreatedEvent,
  UserDeletedEvent,
} from './events';

import { AuthProvider } from './auth-provider';
import { UserUpdatedEvent } from './events/user-updated.event';
import { LoggedInEvent } from './events/logged-in.event';
import { EmailVerifiedEvent } from './events/email-verified.event';
import { ErrorMessages } from './error-messages';

export const ValidationRules = {
  NAME_VALIDATION_REGEXP: /^.{1,30}$/,
  PASSWORD_VALIDATION_REGEXP: /^.{3,30}$/,
  EMAIL_VALIDATION_REGEXP: /^.{1,130}$/,
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
  isLoggedIn: boolean;
}

export interface ICreateUserData {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  authProvider?: AuthProvider;
  role?: UserRole;
  isVerified?: boolean;
  avatarUrl?: string;
}

export interface IUpdateUserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: UserRole;
  avatarUrl?: string;
}

export class User extends AggregateRoot implements IUser {
  private _isLoggedIn: boolean;

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

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  get permissions(): UserPermissions {
    if (this.role === UserRole.ADMIN)
      return new UserPermissions(true, true, true);
    return new UserPermissions(false, false, false);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  verifyEmail(code: string): void {
    if (this.isVerified) throw new Error('User already verified');
    this.apply(new EmailVerifiedEvent(this.id));
  }

  //! ======================[ Protected methods ]====================== !//

  protected constructor(private props: IUserProps) {
    super();
    this.autoCommit = false;
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
    if (!this._isLoggedIn && !opts.ignoreLogin)
      throw new Error(ErrorMessages.USER_NOT_LOGGED_IN);
    if (this.isRemoved && !opts.ignoreRemoved)
      throw new Error(ErrorMessages.USER_REMOVED);
    if (!User.validateName(this.firstName))
      throw new Error(ErrorMessages.INVALID_NAME);
    if (!User.validateName(this.lastName))
      throw new Error(ErrorMessages.INVALID_NAME);
    if (!User.validateEmail(this.email))
      throw new Error(ErrorMessages.INVALID_EMAIL);
    if (!User.validatePassword(this.password))
      throw new Error(ErrorMessages.INVALID_PASSWORD);
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
  static create(data: ICreateUserData): User {
    const user = User.new({
      id: data.id ?? uuid(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      authProvider: data.authProvider ?? AuthProvider.LOCAL,
      role: data.role ?? UserRole.USER,
      isVerified: data.isVerified ?? false,
      avatarUrl: data.avatarUrl ?? '',
      createdAt: new Date(),
      updatedAt: null,
      removedAt: null,
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
    if (user.id === this.id) throw new Error('You cannot remove yourself');
    if (this.role !== UserRole.ADMIN)
      throw new Error('You do not have permission to remove a user');
    this.removeUserByAdmin(user);
  }

  removeUsers(users: User[]): void {
    users.forEach((user) => this.removeUser(user));
  }

  createUser(props: ICreateUserData): User {
    if (this.role !== UserRole.ADMIN)
      throw new Error(ErrorMessages.USER_CREATE_PERMISSION);
    return User.create(props);
  }

  createUsers(props: ICreateUserData[]): User[] {
    return props.map((user) => this.createUser(user));
  }

  /**
   * Updates the properties of a user. Only an admin can update a user.
   * @param data - The properties to update the user with.
   * @throws {PermissionDeniedException} If the requester is not an admin.
   * @returns The updated user.
   */
  updateUser(user: User, data: IUpdateUserData): void {
    if (this.role !== UserRole.ADMIN)
      throw new Error(ErrorMessages.USER_UPDATE_PERMISSION);
    user.updateMe(data);
  }

  updateMe(data: IUpdateUserData): void {
    this.props.firstName = data.firstName ?? this.props.firstName;
    this.props.lastName = data.lastName ?? this.props.lastName;
    this.props.email = data.email ?? this.props.email;
    this.props.role = data.role ?? this.props.role;
    this.props.avatarUrl = data.avatarUrl ?? this.props.avatarUrl;
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
      throw new Error(ErrorMessages.INVALID_PASSWORD);
    this.apply(new PasswordChangedEvent(this.id, newPass));
  }

  comparePassword(pass: string): boolean {
    return this.password === pass;
  }

  loggin(pass: string): void {
    if (!this.comparePassword(pass))
      throw new Error(ErrorMessages.INVALID_PASSWORD);
  }

  //! ======================[ Event methods ]====================== !//
  protected onUserCreatedEvent(event: UserCreatedEvent) {
    const { data } = event;
    this.props.id = data.id;
    this.props.firstName = data.firstName;
    this.props.lastName = data.lastName;
    this.props.email = data.email;
    this.props.password = data.password;
    this.props.authProvider = data.authProvider;
    this.props.role = data.role;
    this.props.isVerified = data.isVerified;
    this.props.avatarUrl = data.avatarUrl;
    this.props.createdAt = data.createdAt;
    this.props.updatedAt = data.updatedAt;
    this.props.removedAt = data.removedAt;
  }

  protected onUserDeletedEvent(event: UserDeletedEvent) {
    this.props.removedAt = new Date();
  }

  protected onLoggedInEvent(event: LoggedInEvent) {
    this._isLoggedIn = true;
  }

  protected onPasswordChangedEvent(event: PasswordChangedEvent) {
    this.props.password = event.password;
  }

  protected onUserUpdatedEvent(event: UserUpdatedEvent) {
    const { data } = event;
    this.props.firstName = data?.firstName ?? this.props.firstName;
    this.props.lastName = data?.lastName ?? this.props.lastName;
    this.props.avatarUrl = data?.avatarUrl ?? this.props.avatarUrl;
    this.props.updatedAt = new Date();
  }

  protected onEmailVerifiedEvent(event: EmailVerifiedEvent) {
    this.props.isVerified = true;
  }
}
