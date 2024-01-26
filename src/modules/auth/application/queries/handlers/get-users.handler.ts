import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetUsersQuery, GetUsersQueryResult } from '../get-users.query';
import { UserRepository } from '../../../domain/interfaces';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler
  implements IQueryHandler<GetUsersQuery, GetUsersQueryResult>
{
  constructor(private readonly userRepository: UserRepository) {}
  async execute() {
    return this.userRepository.getAll();
  }
}
