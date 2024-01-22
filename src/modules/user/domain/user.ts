import { Result } from '@common';
import { UserRole } from './user-role';

// external dependencies
export type TValidatesUserInput = {
  name?: string;
  password?: string;
};

export const ValidationRules = {
  NAME_VALIDATION_REGEXP: /^[a-zA-Z0-9]{3,30}$/,
  PASSWORD_VALIDATION_REGEXP: /^[a-zA-Z0-9]{6,30}$/,
};

export const ErrorMessages = {
  USER_REMOVED: 'User already removed',
  NAME_INVALID_FORMAT: 'Name must be between 3 and 30 characters',
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

export interface ICreateUserPOJC {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  id: string;
  createdAt?: Date;
  updatedAt?: Date | null;
  removedAt?: Date | null;
}

export class User implements IUserProps {
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

  private constructor(private props: IUserProps) {}

  static create(pojc: ICreateUserPOJC): Result<User, string> {
    const nameResult = User.validateName(pojc.name);
    if (nameResult.isFailure()) return Result.failure(nameResult.error);
    const passwordResult = User.validatePassword(pojc.password);
    if (passwordResult.isFailure()) return Result.failure(passwordResult.error);
    const emailResult = User.validateEmail(pojc.email);
    if (emailResult.isFailure()) return Result.failure(emailResult.error);

    const user = new User({
      id: pojc.id,
      name: pojc.name,
      email: pojc.email,
      password: pojc.password,
      role: pojc.role,
      isAuthenticated: false,
      createdAt: pojc.createdAt ?? new Date(),
      updatedAt: pojc.updatedAt ?? null,
      removedAt: pojc.removedAt ?? null,
    });
    return Result.success(user);
  }

  remove(): Result<undefined, string> {
    const isremoved = Boolean(this.props.removedAt);
    if (isremoved) return Result.failure(ErrorMessages.USER_REMOVED);
    this.props.removedAt = new Date();
    return Result.success();
  }

  changePassword(oldPass: string, newPass: string): Result<undefined, string> {
    if (this.isRemoved) throw new Error(ErrorMessages.USER_REMOVED);
    const isPasswordValid = this.comparePassword(oldPass);
    if (!isPasswordValid) return Result.failure('Invalid password');

    this.props.password = newPass;
    return Result.success();
  }

  comparePassword(pass: string): boolean {
    return this.password === pass;
  }

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
}
