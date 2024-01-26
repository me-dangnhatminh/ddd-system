import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateFileCommand } from '../create-file.command';

@CommandHandler(CreateFileHandler)
export class CreateFileHandler implements ICommandHandler<CreateFileCommand> {
  constructor() {}
  execute(command: CreateFileCommand): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
