import { AggregateRoot } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';

import * as Events from './events';
import { IDataEditProfile, IDataRegisterUser, IUser } from './user.abstract';
import { UserRole } from './user-role';
import { AuthProvider } from './auth-provider';
import { UserEmail } from './user-email';
import { UserPassword } from './user-password';
import { Admin } from './admin';
import { Username } from './username';

export class User extends AggregateRoot implements IUser {
  get id(): string {
    return this._id;
  }
  get username(): Username {
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
  get authProvider(): AuthProvider {
    return this._authProvider;
  }
  get name(): string {
    return this._name;
  }
  get avatarUrl(): string {
    return this._avatarUrl;
  }
  get registeredAt(): Date {
    return this._registeredAt;
  }

  isAdmin(): this is Admin {
    return this.role === UserRole.ADMIN;
  }

  constructor(
    private _id: string,
    private _username: Username,
    private _email: UserEmail,
    private _password: UserPassword,
    private _role: UserRole,
    private _authProvider: AuthProvider,
    private _isVerified: boolean,
    private _name: string,
    private _avatarUrl: string,
    private _registeredAt: Date,
  ) {
    super();
    this.autoCommit = false;
  }

  static signUpUser(data: IDataRegisterUser): User {
    const user = new User(
      uuid(),
      Username.new(data.username),
      UserEmail.new(data.email),
      UserPassword.new(data.password),
      UserRole.USER,
      data.authProvider ?? AuthProvider.LOCAL,
      data.isVerified ?? false,
      data.name ?? '',
      data.avatarUrl ?? '',
      new Date(),
    );
    this.applyRegisteredUserEvent(user);
    return user;
  }

  comparePassword(password: string): boolean {
    return this.password.compare(password);
  }

  changePassword(newPassword: string): void {
    this._password = UserPassword.new(newPassword);
    this.apply(new Events.PasswordChangedEvent(this.id));
  }

  editProfile(data: IDataEditProfile): void {
    this._name = data.name ?? this.name;
    this._avatarUrl = data.avatarUrl ?? this.avatarUrl;
    //TODO: Apply event
  }

  verifyEmail(): void {
    this._isVerified = true;
    this.apply(
      new Events.EmailVerifiedEvent({
        email: this.email.value,
        name: this.name,
      }),
    );
  }

  private static applyRegisteredUserEvent(user: User): void {
    user.apply(
      new Events.RegisteredUserEvent({
        id: user.id,
        email: user.email.value,
        name: user.name,
        role: user.role,
        registeredAt: user.registeredAt,
      }),
    );
  }
}
