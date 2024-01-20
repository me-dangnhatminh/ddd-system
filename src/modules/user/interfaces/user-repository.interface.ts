import { IRepository } from '@common/interfaces/repository.interface';
import { User } from '../domain/user';

export abstract class UserRepository implements IRepository<User> {
  abstract getAll(): Promise<User[]>;
  abstract save(user: User): Promise<void>;
  abstract exists(id: string): Promise<boolean>;
  /**
   * @param {string} id The user id to search for.
   * @returns {Promise<User | null>} A promise that contains the user if found, null otherwise.
   */
  abstract getUserById(id: string): Promise<User | null>;
  abstract getUserByEmail(email: string): Promise<User | null>;
}
