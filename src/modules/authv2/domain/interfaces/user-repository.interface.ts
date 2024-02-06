import { User } from '../user';
import { UserEmail } from '../user-email';

export abstract class UserRepository {
  abstract getAll(): Promise<User[]>;
  abstract getById(id: string): Promise<User | null>;
  abstract getByEmail(email: UserEmail): Promise<User | null>;
  abstract save(user: User): Promise<void>;
  abstract deleteByIds(ids: string[]): Promise<void>;
  abstract count(): Promise<number>;
  abstract raw<T = any>(query: string, values?: any[]): Promise<T>;
}
