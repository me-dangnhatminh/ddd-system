import { IQuery, IQueryResult } from '@nestjs/cqrs';

type TSortBy = 'createdAt' | 'updatedAt' | 'email' | 'role';
type TSort = 'asc' | 'desc';

export class GetListUsersQuery implements IQuery {
  public readonly page: number;
  public readonly limit: number;
  public readonly search: string;
  public readonly sortBy: TSortBy;
  public readonly sort: string;
  constructor(
    optional?: Partial<{
      page: number;
      limit: number;
      search: string;
      sortBy: TSortBy;
      sort: TSort;
    }>,
  ) {
    this.page = optional?.page ?? 1;
    this.limit = optional?.limit ?? 10;
    this.search = optional?.search ?? '';
    this.sortBy = optional?.sortBy ?? 'createdAt';
    this.sort = optional?.sort ?? 'asc';
  }
}

export class GetListUsersQueryResult implements IQueryResult {
  constructor(
    public readonly page: number,
    public readonly totalPage: number,
    public readonly limit: number,
    public readonly items: any[],
  ) {}
}
