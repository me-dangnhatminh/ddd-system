import { User } from '../../../domain';
import { UserRepository } from '../../../domain/interfaces';
import { GetUserQuery } from '../get-user.query';
import { IQueryHandler, IQueryResult, QueryHandler } from '@nestjs/cqrs';

interface GetUserResult extends IQueryResult {}

@QueryHandler(GetUserQuery)
export class GetUserHandler
  implements IQueryHandler<GetUserQuery, GetUserResult>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUserQuery): Promise<User> {
    return this.userRepository.getUserById(query.id).then((u) => {
      if (!u) throw new Error('User not found');
      return u;
    });
  }
}
