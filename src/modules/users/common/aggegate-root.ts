import { IEntity } from '@common/interfaces';
import { v4 as uuid } from 'uuid';
export class AggregateRoot implements IEntity<string> {
  constructor(public readonly id: string = uuid()) {}
}
