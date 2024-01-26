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
  USER_REMOVED: 'User already removed',
  NAME_INVALID_FORMAT: 'Name must be between 1 and 30 characters',
  PASSWORD_INVALID: 'Invalid password',
  PASSWORD_INVALID_FORMAT: 'Password must be between 6 and 30 characters',
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

  private constructor(private props: IUserProps) {
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

  remove(): void {
    if (this.isRemoved)
      throw new Error('User already removed, please check isRemoved property');
    this.props.removedAt = new Date();
    this.apply(new UserDeletedEvent(this.id));
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
