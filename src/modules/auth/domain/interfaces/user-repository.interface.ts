import { IOptions } from '@common';
import { IUserProps, ICreateUserData, User, IUpdateUserData } from '../user';

export type TUserFindField =
  | 'id'
  | 'email'
  | 'firstName'
  | 'lastName'
  | 'createdAt'
  | 'updatedAt';

export interface IUserOptions extends IOptions {
  orderBy?: TUserFindField;
}

export abstract class UserRepository {
  abstract save(data: IUserProps): Promise<void>;
  abstract saveMany(data: IUserProps[]): Promise<void>;
  abstract create(data: ICreateUserData): Promise<User>;
  abstract createMany(data: ICreateUserData[]): Promise<void>;
  abstract getOneById(id: string): Promise<User | null>;
  abstract getOneByEmail(email: string): Promise<User | null>;
  abstract getManyByIEmail(email: string): Promise<User[]>;
  abstract findMany(
    field: TUserFindField,
    options?: IUserOptions,
  ): Promise<User[]>;
  abstract updateById(id: string, data: IUpdateUserData): Promise<void>;
  abstract update(data: User): Promise<void>;
  abstract updateMany(data: User[]): Promise<void>;
  abstract deleteByIds(ids: string[]): Promise<void>;
  abstract countWith(
    field: TUserFindField,
    options?: IUserOptions,
  ): Promise<number>;
}
