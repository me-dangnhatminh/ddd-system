import { v4 as uuid } from 'uuid';
import { AggregateRoot } from '@nestjs/cqrs';
import { Either, right, left } from 'fp-ts/Either';

import { UserEmail } from './user-email';
import { UserName } from './user-name';
import { UserPassword } from './user-password';
import { UserRole } from './user-role';
import { IErrorDetail } from '@common';

export interface IUserProps {
  id: string;
  name: UserName;
  email: UserEmail;
  password: UserPassword;
  roles: UserRole[];
  createdAt: Date;
  removedAt: Date | null;
}

export interface IDataCreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles: UserRole[];
}

export interface IUser {
  id: string;
  isLogged: boolean;
  // login(email: string, password: string): Either<string, void>;
  // logout(): void;
  // changeName(name: UserName): void;
  // changePassword(password: UserPassword): void;
}

export class User extends AggregateRoot implements IUser {
  private $isLogged: boolean;

  get id(): string {
    return this.props.id;
  }
  get isLogged(): boolean {
    return this.$isLogged;
  }

  protected constructor(private props: IUserProps) {
    super();
  }

  public static new = (props: IUserProps): User => new User(props);

  public static create(data: IDataCreateUser): Either<IErrorDetail, User> {
    const nameResult = UserName.create(data.firstName, data.lastName);
    const emailResult = UserEmail.create(data.email);
    const passwordResult = UserPassword.create(data.password);

    if (nameResult._tag === 'Left') return left(nameResult.left);
    if (emailResult._tag === 'Left') return left(emailResult.left);
    if (passwordResult._tag === 'Left') return left(passwordResult.left);

    const u = new User({
      id: uuid(),
      name: nameResult.right,
      email: emailResult.right,
      password: passwordResult.right,
      roles: data.roles,
      createdAt: new Date(),
      removedAt: null,
    });

    return right(u);
  }
}
