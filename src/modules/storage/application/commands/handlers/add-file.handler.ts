import { CommandHandler, ICommandHandler, QueryBus } from '@nestjs/cqrs';
import { GetUserQuery, GetUserQueryResult } from '@modules/auth';

import { AddFileCommand } from '../add-file.command';

// add file command handler use CQRS pattern
@CommandHandler(AddFileCommand)
export class AddFileHandler implements ICommandHandler<AddFileCommand> {
  constructor(private readonly queryBus: QueryBus) {}

  async execute(command: AddFileCommand): Promise<any> {}
}
