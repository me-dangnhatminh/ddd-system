import { ICommand } from '@nestjs/cqrs';
import * as Domain from '../../domain';

export class ConfirmEmailCommand implements ICommand {
  constructor(
    public readonly requester: Domain.User,
    public readonly code: number,
  ) {}
}
