import * as NestCQRS from '@nestjs/cqrs';

import * as Shared from '@common';

import { GetProfileQuery, GetProfileQueryResult } from '../get-profile.query';
import { left, right } from 'fp-ts/lib/Either';

@NestCQRS.QueryHandler(GetProfileQuery)
export class GetProfileHandler
  implements
    NestCQRS.IQueryHandler<
      GetProfileQuery,
      Shared.TQueryResult<GetProfileQueryResult>
    >
{
  // get requester in request of express or nest request
  constructor(
    public readonly readRepository: Shared.ReadRepository, // Read side database connection
  ) {}

  async execute(query: GetProfileQuery) {
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

    const user = sqlResult[0]; //TODO: this return any, need to fix
    if (!user) return left([]); //TODO: add not found error
    return right(new GetProfileQueryResult(user));
  }
}
