import { AggregateRoot } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';

import * as Events from './events';
import { IDataEditProfile, IDataRegisterUser, IUser } from './user.abstract';
import { UserRole } from './user-role';
import { AuthProvider } from './auth-provider';
import { UserEmail } from './user-email';
import { UserName } from './user-name';
import { UserPassword } from './user-password';
import { Admin } from './admin';

export class User extends AggregateRoot implements IUser {
  get id(): string {
    return this._id;
  }

  get username(): UserName {
    return this._username;
  }

  get email(): UserEmail {
    return this._email;
  }

  get password(): UserPassword {
    return this._password;
  }

  get role(): UserRole {
    return this._role;
  }

  get isVerified(): boolean {
    return this._isVerified;
  }

  get avatarUrl(): string {
    return this._avatarUrl;
  }

  get authProvider(): AuthProvider {
    return this._authProvider;
  }

  get registeredAt(): Date {
    return this._registerAt;
  }

  isAdmin(): this is Admin {
    return this.role === UserRole.ADMIN;
  }

  constructor(
    private _id: string,
    private _username: UserName,
    private _email: UserEmail,
    private _password: UserPassword,
    private _role: UserRole,
    private _isVerified: boolean,
    private _avatarUrl: string,
    private _authProvider: AuthProvider,
    private _registerAt: Date,
  ) {
    super();
    this.autoCommit = false;
  }

  static registerUser(data: IDataRegisterUser): User {
    const user = new User(
      uuid(),
      data.username,
      data.email,
      data.password,
      UserRole.USER,
      data.isVerified,
      data.avatarUrl,
      data.authProvider,
      new Date(),
    );
    this.applyRegisteredUserEvent(user);
    return user;
  }

  comparePassword(password: string): boolean {
    return this.password.compare(password);
  }

  changePassword(newPassword: string): void {
    this._password.changePassword(newPassword);
    this.apply(new Events.PasswordChangedEvent(this.id));
  }

  editProfile(data: IDataEditProfile): void {
    this._username = data.username ?? this.username;
    this._email = data.email ?? this.email;
    this._avatarUrl = data.avatarUrl ?? this.avatarUrl;
    //TODO: Apply event
  }

  verifyEmail(): void {
    this._isVerified = true;
    this.apply(
      new Events.EmailVerifiedEvent({
        email: this.email.value,
        firstName: this.username.firstName,
        lastName: this.username.lastName,
      }),
    );
  }

  private static applyRegisteredUserEvent(user: User): void {
    user.apply(
      new Events.RegisteredUserEvent({
        id: user.id,
        email: user.email.value,
        firstName: user.username.firstName,
        lastName: user.username.lastName,
        role: user.role,
        registeredAt: user.registeredAt,
      }),
    );
  }
}
