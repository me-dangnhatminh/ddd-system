import { Admin } from '../admin';
import { User } from '../user';

export abstract class UserRepository {
  abstract getUserById(id: string): Promise<User | null>;
  abstract getUserByUsername(username: string): Promise<User | null>;
  abstract getUserByEmail(email: string): Promise<User | null>;
  abstract getAdminById(id: string): Promise<Admin | null>;
  abstract getAdminByEmail(email: string): Promise<Admin | null>;
  abstract userExits(by: {
    email?: string;
    username?: string;
  }): Promise<boolean>;

  abstract save(user: User): Promise<void>;
  abstract deleteByIds(ids: string[]): Promise<void>;
  abstract count(): Promise<number>;
  abstract update(user: User): Promise<void>;
}
