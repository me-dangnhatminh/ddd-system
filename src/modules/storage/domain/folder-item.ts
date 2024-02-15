import { AggregateRoot } from '@nestjs/cqrs';
import { FileItem } from './file-item';

export interface FolderItemProps {
  id: string;
  name: string;
  path: string;
  items: (FolderItem | FileItem)[];
  createdAt: Date;
  updatedAt: Date | null;
}

export interface IFolderItem {
  addFile(file: FileItem): void;
  addFolder(folder: FolderItem): void;
  removeFile(file: FileItem): void;
  removeFolder(folder: FolderItem): void;
}

export class FolderItem extends AggregateRoot {
  constructor(protected props: FolderItemProps) {
    super();
  }
}
