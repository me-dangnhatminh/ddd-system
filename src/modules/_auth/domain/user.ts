import { UserEmail } from './user-email';
import { UserPassword } from './user-password';
import { UserRole } from './user-role';

export interface IUserProps {
  id: string;
  email: UserEmail;
  password: UserPassword;
  roles: UserRole[];
}

export interface IUser {
  login(email: string, password: string): Promise<IUser>;
  comparePassword(plainTextPassword: string): Promise<boolean>;
  changePassword(newPassword: string): Promise<void>;
}
