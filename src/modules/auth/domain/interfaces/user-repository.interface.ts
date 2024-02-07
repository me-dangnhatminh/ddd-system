import { User } from '../user';

export abstract class UserRepository {
  abstract getAll(): Promise<User[]>;
  abstract getById(id: string): Promise<User | null>;
  abstract getByEmail(email: string): Promise<User | null>;
  abstract save(user: User): Promise<void>;
  abstract deleteByIds(ids: string[]): Promise<void>;
  abstract count(): Promise<number>;
}
