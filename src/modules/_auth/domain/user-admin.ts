import { IUser } from './user';
import { UserRole } from './user-role';

export interface IUserAdmin extends IUser {
  changeRole(role: UserRole): Promise<void>;
  changeEmail(email: string): Promise<void>;
  unregister(user: IUser): Promise<void>;
}
