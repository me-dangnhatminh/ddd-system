import { IRepository } from './repository.interface';

// eslint-disable-next-line @typescript-eslint/ban-types
interface Type<T = any> extends Function {
  new (...args: any[]): T;
}
export type RepositoryType<T> = Type<T>;

export abstract class UnitOfWork {
  abstract getRepository<T extends IRepository>(repo: RepositoryType<T>): T;
  abstract commit(): Promise<void>;
  abstract rollback(): Promise<void>;
  abstract startTransaction(): Promise<void>;
  abstract completeTransaction(): Promise<void>;
  abstract closeConnection(): Promise<void>;
}
