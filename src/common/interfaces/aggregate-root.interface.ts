import { IEntity } from './entity.interface';

export interface IAggregateRoot<T extends number | string> extends IEntity<T> {}
