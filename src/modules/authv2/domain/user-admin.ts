import { Either } from 'fp-ts/lib/Either';
import { IUser } from './user';
import { UserRole } from './user-role';

export interface IUserAdmin extends IUser {
  changeRole(role: UserRole): Either<string, void>;
  changeEmail(email: string): Either<string, void>;
  unregister(user: IUser): Either<string, void>;
  remove(user: IUser): Either<string, void>;
}
