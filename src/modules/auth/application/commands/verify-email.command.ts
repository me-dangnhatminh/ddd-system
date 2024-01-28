import { ICommand } from '@nestjs/cqrs';
import { User } from '../../domain';

export class VerifyEmailCommand implements ICommand {
  constructor(
    public requester: User,
    public code?: string,
  ) {}
}
