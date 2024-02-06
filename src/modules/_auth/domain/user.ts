import { Entity } from '@common';
import { UserEmail } from './user-email';
import { UserName } from './user-name';
import { UserPassword } from './user-password';
import { UserRole } from './user-role';

export interface IUserProps {
  id: string;
  name: UserName;
  email: UserEmail;
  password: UserPassword;
  roles: UserRole[];
}

export interface IUser {
  // isLogged: boolean;
  // login(email: string, password: string): Promise<IUser>;
  // comparePassword(plainTextPassword: string): Promise<boolean>;
  // changePassword(newPassword: string): Promise<void>;
}

export class User extends Entity<IUserProps> implements IUser {
  private _isLogged: boolean;
  get isLogged(): boolean {
    return this._isLogged;
  }

  protected constructor(props: IUserProps, id: string) {
    super(props, id);
  }
}
