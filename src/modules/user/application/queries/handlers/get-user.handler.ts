import { User } from '@modules/user/domain';
import { UserRepository } from '@modules/user/domain/interfaces';
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
      const user = User.create(u);
      if (!user.isSuccess()) throw new Error(user.error);
      return user.value;
    });
  }
}
