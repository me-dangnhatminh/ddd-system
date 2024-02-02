import { User } from '../../../domain';
import { UserRepository } from '../../../domain/interfaces';
import { GetUserQuery } from '../get-user.query';
import { IQueryHandler, IQueryResult, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from './login-user.handler';

interface GetUserResult extends IQueryResult {}

@QueryHandler(GetUserQuery)
export class GetUserHandler
  implements IQueryHandler<GetUserQuery, GetUserResult>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUserQuery): Promise<User> {
    const user = await this.userRepository.getOneById(query.id);
    if (!user) throw new NotFoundException('User not found.');
    return user;
  }
}
