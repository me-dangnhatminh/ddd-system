import * as NestCQRS from '@nestjs/cqrs';
import { right } from 'fp-ts/lib/Either';

import * as Shared from '@shared';

import { GetProfileQuery, GetProfileQueryResult } from '../get-profile.query';

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
    if (!user) throw new Error('User not found'); //TODO: this return any, need to fix
    return right(new GetProfileQueryResult(user));
  }
}
