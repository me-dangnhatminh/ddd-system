import { IRepository } from '@common';
import { IUserProps, ICreateUserProps, User } from '../user';

export abstract class UserRepository implements IRepository {
  abstract save(user: IUserProps): Promise<void>;
  abstract create(data: ICreateUserProps): Promise<User>;
  abstract exists(id: string): Promise<boolean>;
  abstract getAll(): Promise<User[]>;
  abstract getUserById(id: string): Promise<User | null>;
  abstract getUserByEmail(email: string): Promise<User | null>;
  abstract update(user: User): Promise<void>;
}
