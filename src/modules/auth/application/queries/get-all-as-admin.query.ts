import { IQuery } from '@nestjs/cqrs';

export type TOrder = 'ASC' | 'DESC';
export type TOrderBy = 'id' | 'email' | 'fullname' | 'createdAt' | 'updatedAt';

export class GetAllAsAdminQuery implements IQuery {
  readonly page: number;
  readonly pageSize: number;
  readonly search: string | null;
  readonly orderBy: TOrderBy;
  readonly order: TOrder;
  constructor(data: {
    page?: number;
    pageSize?: number;
    search?: string;
    orderBy?: TOrderBy;
    order?: TOrder;
  }) {
    this.page = data.page ?? 1;
    this.pageSize = data.pageSize ?? 10;
    this.search = data.search ?? null;
    this.orderBy = data.orderBy ?? 'createdAt';
    this.order = data.order ?? 'ASC';
  }
}

export class GetAllAsAdminQueryResult {
  readonly page: number;
  readonly pageSize: number;
  readonly totalPages: number;
  readonly items: any;

  constructor(data: {
    page: number;
    pageSize: number;
    totalPages: number;
    items: any;
  }) {
    this.page = data.page;
    this.pageSize = data.pageSize;
    this.totalPages = data.totalPages;
    this.items = data.items;
  }
}
