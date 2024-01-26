import { IQuery } from '@nestjs/cqrs';
import { User } from '../../domain';

export class GetUsersQuery implements IQuery {}
export interface GetUsersQueryResult extends Array<User> {}
