import * as NestCQRS from '@nestjs/cqrs';
import * as Either from 'fp-ts/lib/Either';
import * as Shared from '@common';
import {
  GetProfileAsAdminQuery,
  GetProfileAsAdminQueryResult,
} from '../get-profile-as-admin.query';

@NestCQRS.QueryHandler(GetProfileAsAdminQuery)
export class GetProfileAsAdminHandler
  implements NestCQRS.IQueryHandler<GetProfileAsAdminQuery>
{
  constructor(
    public readonly readRepository: Shared.ReadRepository, // Read side database connection
  ) {}
  async execute(
    query: GetProfileAsAdminQuery,
  ): Promise<Either.Either<Shared.IErrorDetail, GetProfileAsAdminQueryResult>> {
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
    return Either.right(user);
  }
}
