import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetUsersQuery, GetUsersQueryResult } from '../get-users.query';
import { UserRepository } from '../../../domain/interfaces';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler
  implements IQueryHandler<GetUsersQuery, GetUsersQueryResult>
{
  constructor(private readonly userRepository: UserRepository) {}
  async execute(query: GetUsersQuery): Promise<GetUsersQueryResult> {
    const { page, search, sortBy, sort, limit } = query;

    const users = await this.userRepository.getAll();
    const totalPage = Math.ceil(users.length / limit);

    const itemsSorted = users.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sort === 'asc' ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sort === 'asc' ? 1 : -1;
      return 0;
    });
    const itemsLimited = itemsSorted.slice((page - 1) * limit, page * limit);

    const items =
      search.length <= 0
        ? itemsLimited
        : itemsLimited.filter((user) => {
            user.fullname.toLowerCase().includes(search.toLowerCase());
          });
    return new GetUsersQueryResult(page, totalPage, limit, items);
  }
}
