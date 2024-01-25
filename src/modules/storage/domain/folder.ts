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
    folders: Map<Folder['id'], File>;
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
  private constructor(private props: IFolderProps) {
    super();
    this.autoCommit = false;
  }

  get id() {
    return this.props.id;
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
