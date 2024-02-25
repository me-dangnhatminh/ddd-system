import { AuthProvider } from './auth-provider';
import { UserEmail } from './user-email';
import { UserName } from './user-name';
import { UserPassword } from './user-password';
import { UserRole } from './user-role';

export interface IDataRegisterUser {
  username: UserName;
  email: UserEmail;
  password: UserPassword;
  isVerified: boolean;
  avatarUrl: string;
  authProvider: AuthProvider;
}

export interface IDataEditProfile {
  username: UserName;
  email: UserEmail;
  avatarUrl: string;
}

export interface IUser {
  id: string;
  username: UserName;
  email: UserEmail;
  password: UserPassword;
  role: UserRole;
  isVerified: boolean;
  avatarUrl: string;
  authProvider: AuthProvider;
  registeredAt: Date;
  isAdmin(): this is IAdmin;
  comparePassword(password: string): boolean;
  changePassword(newPassword: string): void;
  editProfile(data: IDataEditProfile): void;
  verifyEmail(): void;
}

export interface IAdmin extends IUser {
  registerAdmin(data: IDataRegisterUser): IAdmin;
  editUser(user: IUser, data: IDataEditProfile): void;
  unregisterUser(user: IUser): void;
}
