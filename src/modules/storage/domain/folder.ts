import { AggregateRoot } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';

import { File } from './file';
import { Permissions } from './permissions';

export interface IFolderProps {
  id: string;
  name: string;
  path: string;
  permissions: Permissions;
  ownerId: string;
  contains: {
    files: Map<File['id'], File>;
    folders: Map<Folder['id'], Folder>;
  };
}

export interface ICreateFolderProps {
  id?: string;
  name: string;
  path: string;
  permissions?: Permissions;
  ownerId: string;
  files?: Map<File['id'], File>;
  folders?: Map<Folder['id'], File>;
}

export class Folder extends AggregateRoot {
  get id(): string {
    return this.props.id;
  }
  get name(): string {
    return this.props.name;
  }
  get path(): string {
    return this.props.path;
  }
  get permissions(): Permissions {
    return this.props.permissions;
  }
  get ownerId(): string {
    return this.props.ownerId;
  }
  get contains(): IFolderProps['contains'] {
    return this.props.contains;
  }

  private constructor(private props: IFolderProps) {
    super();
    this.autoCommit = false;
  }

  addFile(file: File) {
    const canWrite = this.permissions.canWrite;
    if (!canWrite)
      throw new Error('No permission to write, please check permissions');
    const exits = this.props.contains.files.get(file.id);
    if (exits) throw new Error('File already exists, please check file id');
    this.props.contains.files.set(file.id, file);
    // TODO: file added event
  }

  addFolder(folder: Folder) {
    const canWrite = this.props.permissions.canWrite;
    if (!canWrite) throw new Error('No permission to write');
    const exits = this.props.contains.folders.get(folder.id);
    if (exits) throw new Error('Folder already exists');
    this.props.contains.folders.set(folder.id, folder);
    // TODO: folder added event
  }

  static create(props: ICreateFolderProps): Folder {
    return new Folder({
      id: props.id ?? uuid(),
      name: props.name,
      path: props.path,
      permissions: props.permissions ?? Permissions.create(),
      ownerId: props.ownerId,
      contains: {
        files: props.files ?? new Map(),
        folders: props.folders ?? new Map(),
      },
    });
  }
}
