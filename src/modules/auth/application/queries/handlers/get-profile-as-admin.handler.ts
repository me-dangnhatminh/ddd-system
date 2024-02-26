import * as NestCQRS from '@nestjs/cqrs';
import * as Shared from '@common';

import {
  GetProfileAsAdminQuery,
  GetProfileAsAdminQueryResult,
  TGetProfileAsAdminQueryResult,
} from '../get-profile-as-admin.query';

@NestCQRS.QueryHandler(GetProfileAsAdminQuery)
export class GetProfileAsAdminHandler
  implements
    NestCQRS.IQueryHandler<
      GetProfileAsAdminQuery,
      TGetProfileAsAdminQueryResult
    >
{
  constructor(
    public readonly readRepository: Shared.ReadRepository, // Read side database connection
  ) {}
  async execute(query: GetProfileAsAdminQuery) {
    const { userId } = query;
    const sqlResult = await this.readRepository.$query<any>`
      SELECT
        id,
        email,
        first_name as "firstName",
        last_name as "lastName",
        role,
        avatar_url as "avatarUrl"
      FROM users WHERE id = ${userId}`;

    const user = sqlResult[0];
    if (!user) return Shared.Result.failure([]);
    return Shared.Result.success(new GetProfileAsAdminQueryResult(user));
  }
}
