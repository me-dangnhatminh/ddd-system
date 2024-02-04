import { IQuery } from '@nestjs/cqrs';
import { User } from '../../domain';

export class GetTokenQuery implements IQuery {
  constructor(public readonly requester: User) {}
}

export class GetTokenQueryResult {
  constructor(public readonly accessToken: string) {}
}
