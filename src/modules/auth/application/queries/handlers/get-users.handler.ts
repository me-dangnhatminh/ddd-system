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
    const count = await this.userRepository.countWith('id');
    const totalPage = Math.ceil(count / limit);
    const items = await this.userRepository.findMany('firstName', {
      limit,
      offset: (page - 1) * limit,
      orderBy: sortBy,
      order: sort,
      search,
    });
    return new GetUsersQueryResult(page, totalPage, limit, items);
  }
}
