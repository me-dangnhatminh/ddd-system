import * as NestCQRS from '@nestjs/cqrs';
import * as Either from 'fp-ts/lib/Either';

import * as Shared from '@common';

import {
  GetAllAsAdminQuery,
  GetAllAsAdminQueryResult,
  TGetAllAsAdminQueryResult,
  TOrderBy,
} from '../get-all-as-admin.query';

@NestCQRS.QueryHandler(GetAllAsAdminQuery)
export class GetAllAsAdminHandler
  implements
    NestCQRS.IQueryHandler<GetAllAsAdminQuery, TGetAllAsAdminQueryResult>
{
  constructor(private readonly readRepository: Shared.ReadRepository) {}

  async execute(query: GetAllAsAdminQuery) {
    const { page, pageSize, search, order } = query;
    const orderBy = this.convertOrderBy(query.orderBy);

    const searchQuery = search ? `WHERE email LIKE '%${search}%'` : '';
    const totalQuery = await this.readRepository.$queryUnsafe<any>(
      `SELECT COUNT(*) AS count FROM users ${searchQuery}`,
    );
    const total = parseInt(totalQuery[0].count, 10);
    const totalPages = Math.ceil(total / pageSize);

    const orderByQuery = `ORDER BY ${orderBy} ${order}`;
    const pageSizeQuery = `LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}`;

    //TODO: SQL Injection safe and performance improvement needed
    const sqlquery = `
      SELECT
        id,
        email,
        first_name AS "firstName",
        last_name AS "lastName",
        registered_at AS "registerdAt",
        updated_at AS "updatedAt"
      FROM users
      ${searchQuery}
      ${orderByQuery}      
      ${pageSizeQuery}
    `;
    const items = await this.readRepository.$queryUnsafe<any>(sqlquery);

    const result = new GetAllAsAdminQueryResult({
      page,
      pageSize,
      totalPages,
      items,
    });
    return Either.right(result);
  }

  private convertOrderBy(orderBy: TOrderBy): string {
    switch (orderBy) {
      case 'id':
        return 'id';
      case 'email':
        return 'email';
      case 'createdAt':
        return 'created_at';
      case 'updatedAt':
        return 'updated_at';
      default:
        return 'created_at';
    }
  }
}
