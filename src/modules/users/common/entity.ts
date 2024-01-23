import { IEntity } from '@common/interfaces';
import { v4 as uuid } from 'uuid';

export class Entity<T> implements IEntity<string> {
  constructor(
    protected props: T,
    public readonly id = uuid(),
  ) {}
}
