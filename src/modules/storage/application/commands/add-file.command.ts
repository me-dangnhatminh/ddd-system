import { ICommand } from '@nestjs/cqrs';
export class AddFileCommand implements ICommand {
  constructor(
    public readonly folderId: string,
    public readonly file: File,
  ) {}
}
