import { IRepository } from '@common/interfaces/persistence';
import { IUserProps, TCreateUserInput, User } from '../domain/user';

export abstract class UserRepository implements IRepository {
  abstract save(user: IUserProps): Promise<void>;
  abstract create(input: TCreateUserInput): Promise<User>;
  abstract exists(id: string): Promise<boolean>;
  abstract getAll(): Promise<User[]>;
  abstract getUserById(id: string): Promise<User | null>;
  abstract getUserByEmail(email: string): Promise<User | null>;
}
