import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ReadRepository, nameof } from '@common';
import {
  GetListUsersQuery,
  GetListUsersQueryResult,
} from '../get-list-user.query';
import { User } from '../../../domain';

@QueryHandler(GetListUsersQuery)
export class GetListUsersHandler implements IQueryHandler<GetListUsersQuery> {
  constructor(public readonly readRepository: ReadRepository) {}
  async execute(query: GetListUsersQuery): Promise<GetListUsersQueryResult> {
    const { page, limit, search, sortBy, sort } = query;

    // count
    const total = (await this.readRepository
      .$query`SELECT COUNT(*) as total FROM users`[0].total) as number;
    const totalPages = Math.ceil(total / limit);

    const users = await this.readRepository.$query<any[]>`
      SELECT  id as ${nameof<User>('id')},
              firstName as ${nameof<User>('firstName')},
              lastName as ${nameof<User>('lastName')},
              email as ${nameof<User>('email')},
              password as ${nameof<User>('password')},
              role as ${nameof<User>('role')},
              isVerified as ${nameof<User>('isVerified')},
              avatarUrl as ${nameof<User>('avatarUrl')},
              createdAt as ${nameof<User>('createdAt')},
              updatedAt as ${nameof<User>('updatedAt')},
              removedAt as ${nameof<User>('removedAt')}
      FROM users
      WHERE (firstName + ' ' + lastName LIKE '%${search}%' OR email LIKE '%${search}%')
      ORDER BY ${sortBy} ${sort}
      LIMIT ${limit} OFFSET ${page * limit}
      `;

    return new GetListUsersQueryResult(page, totalPages, limit, users);
  }
}
