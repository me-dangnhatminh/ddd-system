import { IQueryHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../../domain';
import {
  GetListUsersQuery,
  GetListUsersQueryResult,
} from '../get-list-user.query';

export class GetListUsersHandler implements IQueryHandler<GetListUsersQuery> {
  constructor(public readonly userRepository: UserRepository) {}
  async execute(): Promise<GetListUsersQueryResult> {
    const result = new GetListUsersQueryResult(1, 1, 1, []);
    return result;
  }
}
