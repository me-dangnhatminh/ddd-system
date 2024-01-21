import { Result } from '@common';
import {
  CreatedUserEvent,
  DeletedUserEvent,
  PasswordChangedEvent,
} from './events';
import { UserRole } from './user-role';

// external dependencies
import { v4 as uuid } from 'uuid';
import { AggregateRoot } from '@nestjs/cqrs';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

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
  updatedAt: Date | null;
  removedAt: Date | null;
}

export type TCreateUserInput = Partial<IUserProps> & {
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

export class User extends AggregateRoot implements IUserProps {
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

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get removedAt(): Date {
    return this.props.removedAt;
  }

  get isRemoved(): boolean {
    return Boolean(this.props.removedAt);
  }

  private constructor(private props: IUserProps) {
    super();
  }

  static create(input: TCreateUserInput, isnew: boolean = true): Result<User> {
    const user = new User({
      id: input.id ?? uuid(),
      name: input.name,
      email: input.email,
      password: this.hashPassword(input.password),
      role: input.role,
      createdAt: input.createdAt ?? new Date(),
      updatedAt: input.updatedAt ?? null,
      removedAt: input.removedAt ?? null,
    });
    if (isnew) user.apply(new CreatedUserEvent(user));

    user.commit();
    return Result.success(user);
  }

  remove(): Result<undefined, string> {
    const isremoved = Boolean(this.props.removedAt);
    if (isremoved) return Result.failure(ErrorMessages.USER_REMOVED);
    this.props.removedAt = new Date();
    this.apply(new DeletedUserEvent(this.props.id));
    return Result.success();
  }

  changePassword(oldPass: string, newPass: string): Result<undefined, string> {
    if (this.isRemoved) throw new Error(ErrorMessages.USER_REMOVED);
    const isPasswordValid = this.comparePassword(oldPass);
    if (!isPasswordValid) return Result.failure('Invalid password');

    this.props.password = User.hashPassword(newPass);

    this.apply(new PasswordChangedEvent(this.props.id, this.props.password));
    return Result.success();
  }

  static validate(input: TValidatesUserInput): Result<undefined, string> {
    const { name, password } = input;
    const isNameValid =
      name !== undefined
        ? ValidationRules.NAME_VALIDATION_REGEXP.test(name)
        : true;
    const isPasswordValid =
      password !== undefined
        ? ValidationRules.PASSWORD_VALIDATION_REGEXP.test(password)
        : true;

    if (!isNameValid) return Result.failure(ErrorMessages.NAME_INVALID_FORMAT);
    if (!isPasswordValid)
      return Result.failure(ErrorMessages.PASSWORD_INVALID_FORMAT);
    return Result.success();
  }

  public comparePassword(pass: string): boolean {
    const hashedPassword = this.props.password;
    return compareSync(pass, hashedPassword);
  }

  private static hashPassword(pass: string): string {
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(pass, salt);
    return hashedPassword;
  }
}
