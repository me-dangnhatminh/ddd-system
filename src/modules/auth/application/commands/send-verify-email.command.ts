import { ICommand } from '@nestjs/cqrs';
import { User } from '../../domain';

export class SendVerifyEmailCommand implements ICommand {
  constructor(public readonly requester: User) {}
}
