import { AuthProvider } from './auth-provider';
import { UserEmail } from './user-email';
import { UserPassword } from './user-password';
import { UserRole } from './user-role';
import { Username } from './username';

export interface IDataRegisterUser {
  email: string;
  password: string;
  username: string;
  name?: string;
  avatarUrl?: string;
  isVerified?: boolean;
  authProvider?: AuthProvider;
}

export interface IDataEditProfile {
  name: string;
  avatarUrl: string;
}

export interface IUser {
  // auth ------------------------
  id: string;
  username: Username;
  email: UserEmail;
  password: UserPassword;
  role: UserRole;
  isVerified: boolean;
  authProvider: AuthProvider;
  // profile ---------------------
  name: string;
  avatarUrl: string;
  registeredAt: Date;
  // methods ---------------------
  isAdmin(): this is IAdmin;
  comparePassword(password: string): boolean;
  changePassword(newPassword: string): void;
  editProfile(data: IDataEditProfile): void;
  verifyEmail(): void;
}

export interface IAdmin extends IUser {
  signUpAdmin(data: IDataRegisterUser): IAdmin;
  editUser(user: IUser, data: IDataEditProfile): void;
}
