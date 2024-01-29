import { IQuery } from '@nestjs/cqrs';
import { TUserFindField, User } from '../../domain';

export class GetUsersQuery implements IQuery {
  public readonly page: number;
  public readonly limit: number;
  public readonly search: string;
  public readonly sortBy: TUserFindField;
  public readonly sort: 'asc' | 'desc';
  constructor(
    private readonly optional?: Partial<{
      page: number;
      limit: number;
      search: string;
      sortBy: TUserFindField;
      sort: 'asc' | 'desc';
    }>,
  ) {
    this.page = optional?.page ?? 1;
    this.limit = optional?.limit ?? 10;
    this.search = optional?.search ?? '';
    this.sortBy = optional?.sortBy ?? 'createdAt';
    this.sort = optional?.sort ?? 'asc';
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
