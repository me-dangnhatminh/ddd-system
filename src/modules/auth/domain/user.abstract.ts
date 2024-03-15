import { AuthProvider } from './auth-provider';
import { UserEmail } from './user-email';
import { UserPassword } from './user-password';
import { UserRole } from './user-role';

export interface IDataRegisterUser {
  email: string;
  password: string;
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
  id: string;
  name: string;
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
  signUpAdmin(data: IDataRegisterUser): IAdmin;
  editUser(user: IUser, data: IDataEditProfile): void;
}
