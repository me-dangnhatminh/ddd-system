import { AggregateRoot } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';

import { Result } from '@common';
import { UserRole } from './user-role';
import { UserPermissions } from './user-permissions';
import {
  PasswordChangedEvent,
  UserCreatedEvent,
  UserDeletedEvent,
} from './events';
import { Logger } from '@nestjs/common';
import {
  ConflictException,
  RoleValidationException,
  ValidationRulesException,
} from './exceptions/user-exception';

// external dependencies
export type TValidatesUserInput = {
  name?: string;
  password?: string;
};

export const ValidationRules = {
  NAME_VALIDATION_REGEXP: /^[a-zA-Z0-9]{1,30}$/,
  PASSWORD_VALIDATION_REGEXP: /^[a-zA-Z0-9]{6,30}$/,
};

export const ErrorMessages = {
  USER_REMOVED: 'User already removed, please check isRemoved property',
  NAME_INVALID_FORMAT: 'Name must be between 1 and 30 characters',
  PASSWORD_INVALID: 'Invalid password',
  PASSWORD_INVALID_FORMAT: 'Password must be between 6 and 30 characters',
  CANNOT_REMOVE_YOURSELF: 'You cannot remove yourself',
  CANNOT_REMOVE_USER:
    'You do not have permission to remove this user, only admins can remove users',
  PERMISSION_DENIED: 'Permission denied',
};

export interface IUserProps {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  isAuthenticated: boolean;
  updatedAt: Date | null;
  removedAt: Date | null;
}

export interface ICreateUserPOCO {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date | null;
  removedAt?: Date | null;
}

export interface IUpdateUserPOCO {
  name?: string;
  email?: string;
  role?: UserRole;
}

export class User extends AggregateRoot {
  get id() {
    return this.props.id;
  }
  get name(): string {
    return this.props.name;
  }
  get email(): string {
    return this.props.email;
  }
  get password(): string {
    return this.props.password;
  }
  get role(): UserRole {
    return this.props.role;
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
    return Boolean(this.props.removedAt);
  }
  get isAuthenticated(): boolean {
    return Boolean(this.props.isAuthenticated);
  }

  protected constructor(private props: IUserProps) {
    super();
    this.autoCommit = false;
  }

  static create(poco: ICreateUserPOCO): Result<User, string> {
    // const nameResult = User.validateName(poco.name);
    // if (nameResult.isFailure()) return Result.failure(nameResult.error);
    // const passwordResult = User.validatePassword(poco.password);
    // if (passwordResult.isFailure()) return Result.failure(passwordResult.error);
    // const emailResult = User.validateEmail(poco.email);
    // if (emailResult.isFailure()) return Result.failure(emailResult.error);

    const user = new User({
      id: poco.id ?? uuid(),
      name: poco.name,
      email: poco.email,
      password: poco.password,
      role: poco.role,
      isAuthenticated: false,
      createdAt: poco.createdAt ?? new Date(),
      updatedAt: poco.updatedAt ?? null,
      removedAt: poco.removedAt ?? null,
    });
    user.apply(new UserCreatedEvent(user));
    return Result.success(user);
  }

  /**
   *
   * @param {User} user - user to be removed
   * @throws {ValidationRulesException} if user is removed
   * @throws {ConflictException} if user is removed, please check isRemoved property
   * @throws {RoleValidationException} if user is not admin, please check isAdmin property
   * @throws {ConflictException} if user is removed, please check isRemoved property
   */
  removeUser(user: User): void {
    if (this.isRemoved)
      throw new ValidationRulesException(ErrorMessages.USER_REMOVED);
    if (user.id === this.id)
      throw new ConflictException(ErrorMessages.CANNOT_REMOVE_YOURSELF);
    else if (this.role !== UserRole.ADMIN)
      throw new RoleValidationException(ErrorMessages.PERMISSION_DENIED);
    else if (user.isRemoved)
      throw new ConflictException(ErrorMessages.USER_REMOVED);

    this.removeUserByAdmin(user);
  }

  /**
   *
   * @param {User[]} users - users to be removed
   * @throws {Error} if user is removed
   */
  removeUsers(users: User[]): void {
    users.forEach((user) => this.removeUser(user));
  }

  // UserEmailVerifiedEvent
  static verifyEmail(user: User): void {
    if (user.isRemoved)
      throw new Error('User already removed, please check isRemoved property');
    user.props.isAuthenticated = true;
  }

  update(poco: IUpdateUserPOCO): Result<undefined, string> {
    if (this.isRemoved)
      throw new Error('User already removed, please check isRemoved property');
    if (poco.name) {
      const nameResult = User.validateName(poco.name);
      if (nameResult.isFailure()) return Result.failure(nameResult.error);
      this.props.name = poco.name;
    }
    if (poco.email) {
      const emailResult = User.validateEmail(poco.email);
      if (emailResult.isFailure()) return Result.failure(emailResult.error);
      this.props.email = poco.email;
    }
    if (poco.role) this.props.role = poco.role;
    this.props.updatedAt = new Date();
    return Result.success();
  }

  getPermissions(user: User = this): UserPermissions {
    if (user.id === this.id) return new UserPermissions(true, false, true);
    if (this.role === UserRole.ADMIN)
      return new UserPermissions(true, true, true);
    return new UserPermissions(false, false, false);
  }

  private removeUserByAdmin(user: User): void {
    user.props.removedAt = new Date();
    user.apply(new UserDeletedEvent(user.id));
  }

  changePassword(oldPass: string, newPass: string): Result<undefined, string> {
    if (this.isRemoved)
      throw new Error('User already removed, please check isRemoved property');
    const isPasswordValid = this.comparePassword(oldPass);
    if (!isPasswordValid) return Result.failure('Invalid password');

    this.props.password = newPass;
    this.apply(new PasswordChangedEvent(this.id, this.props.password));
    return Result.success();
  }

  comparePassword(pass: string): boolean {
    return this.password === pass;
  }

  // events handlers
  protected onUserCreatedEvent(event: UserCreatedEvent) {
    Logger.log(`User Create with name: ${event.user.name}`, User.name);
  }

  // static methods

  static validatePassword(pass: string): Result<string, string> {
    const isValid = ValidationRules.PASSWORD_VALIDATION_REGEXP.test(pass);
    if (!isValid) return Result.failure(ErrorMessages.PASSWORD_INVALID_FORMAT);
    return Result.success(pass);
  }

  static validateName(name: string): Result<string, string> {
    const isValid = ValidationRules.NAME_VALIDATION_REGEXP.test(name);
    if (!isValid) return Result.failure(ErrorMessages.NAME_INVALID_FORMAT);
    return Result.success(name);
  }

  static validateEmail(email: string): Result<string, string> {
    return Result.success(email);
  }

  private checkPermissionsAndThrowError(): void {}
}
