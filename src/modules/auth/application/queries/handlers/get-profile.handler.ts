import * as NestCQRS from '@nestjs/cqrs';
import * as Either from 'fp-ts/lib/Either';
import * as Shared from '@common';
import { GetProfileQuery, GetProfileQueryResult } from '../get-profile.query';

@NestCQRS.QueryHandler(GetProfileQuery)
export class GetProfileHandler
  implements NestCQRS.IQueryHandler<GetProfileQuery>
{
  constructor(
    public readonly readRepository: Shared.ReadRepository, // Read side database connection
  ) {}
  async execute(
    query: GetProfileQuery,
  ): Promise<Either.Either<Shared.IErrorDetail, GetProfileQueryResult>> {
    const { userId } = query;
    const sqlResult = await this.readRepository.$query`SELECT
      id as id,
      email as email,
      first_name as firstName,
      last_name as lastName,
      role as role,
      avatar_url as avatarUrl,
      FROM users WHERE id = ${userId}`;
    const user = sqlResult[0];
    return Either.right(user);
  }
}
