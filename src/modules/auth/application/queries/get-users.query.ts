import { IQuery } from '@nestjs/cqrs';
import { User } from '../../domain';

export class GetUsersQuery implements IQuery {
  public readonly page: number;
  public readonly limit: number;
  public readonly search: string;
  public readonly sortBy: string;
  public readonly sort: 'asc' | 'desc';
  constructor(
    private readonly optional?: Partial<{
      page: number;
      limit: number;
      search: string;
      sortBy: string;
      sort: 'asc' | 'desc';
    }>,
  ) {
    this.page = optional?.page ?? 1;
    this.limit = optional?.limit ?? 10;
    this.search = optional?.search ?? '';
    this.sortBy = optional?.sortBy ?? 'createdAt';
    this.sort = optional?.sort ?? 'desc';

    const allowedSB = ['createdAt', 'updatedAt', 'fullname', 'email', 'role'];
    if (!allowedSB.includes(this.sortBy))
      throw new Error('Sort by must be one of ' + allowedSB.join(', ') + '.');
  }
}
export class GetUsersQueryResult {
  constructor(
    public readonly page: number,
    public readonly totalPage: number,
    public readonly limit: number,
    public readonly items: User[],
  ) {}
}
