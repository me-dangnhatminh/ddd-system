import { IEntity } from './interfaces/entity.interface';

/* eslint-disable @typescript-eslint/no-unused-vars */
export class Entity<T, IIdentify extends number | string = string>
  implements IEntity<IIdentify>
{
  constructor(
    protected readonly props: T,
    public readonly id: IIdentify,
  ) {}
}
