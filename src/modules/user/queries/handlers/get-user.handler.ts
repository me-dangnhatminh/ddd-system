import { GetUserQuery } from '../get-user.query';
import { UserRepository } from '../../interfaces';
import { User } from '../../domain/user';
import { IQueryHandler, IQueryResult, QueryHandler } from '@nestjs/cqrs';

interface GetUserResult extends IQueryResult {}

@QueryHandler(GetUserQuery)
export class GetUserHandler
  implements IQueryHandler<GetUserQuery, GetUserResult>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUserQuery): Promise<User> {
    return this.userRepository.getUserById(query.id).then((u) => {
      const user = User.create(u, false);
      if (!user.isSuccess()) throw new Error(user.error);
      return user.value;
    });
  }
}
