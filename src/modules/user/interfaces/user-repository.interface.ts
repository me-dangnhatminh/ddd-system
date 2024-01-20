import { IRepository } from '@common/interfaces/repository.interface';
import { IUserProps, TCreateUserInput, User } from '../domain/user';

export abstract class UserRepository implements IRepository<User> {
  abstract getAll(): Promise<IUserProps[]>;
  abstract save(user: IUserProps): Promise<void>;
  abstract create(input: TCreateUserInput): Promise<IUserProps>;
  abstract exists(id: string): Promise<boolean>;
  abstract getUserById(id: string): Promise<IUserProps | null>;
  abstract getUserByEmail(email: string): Promise<IUserProps | null>;
}
