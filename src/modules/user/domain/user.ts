import { Result } from '@common';

import { CreatedUserEvent } from './events';
import { DeletedUserEvent } from './events/deleted-user.event';
import { UserRole } from './user-role';
import { v4 as uuid } from 'uuid';
import { AggregateRoot } from '@nestjs/cqrs';

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

const ErrorMessages = {
  USER_REMOVED: 'User already removed',
};

export class User extends AggregateRoot implements IUserProps {
  private constructor(private props: IUserProps) {
    super();
  }

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

  static create(input: TCreateUserInput, isnew: boolean = true): Result<User> {
    const user = new User({
      id: input.id ?? uuid(),
      name: input.name,
      email: input.email,
      password: input.password,
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
}
