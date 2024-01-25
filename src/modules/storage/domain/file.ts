import { AggregateRoot } from '@nestjs/cqrs';
import { v4 as uuid } from 'uuid';

import { Permissions } from './permissions';

export interface IFileProps {
  id: string;
  name: string;
  type: string;
  path: string;
  permissions: Permissions;
  ownerId: string;
}

export interface IFileCreateProps {
  id?: string;
  name: string;
  type: string;
  path: string;
  permissions?: Permissions;
  ownerId: string;
}

export class File extends AggregateRoot {
  private constructor(private props: IFileProps) {
    super();
    this.autoCommit = false;
  }

  get id(): string {
    return this.props.id;
  }

  static create(props: IFileCreateProps): File {
    return new File({
      id: props?.id ?? uuid(),
      name: props.name,
      type: props.type,
      path: props.path,
      permissions: props.permissions ?? Permissions.create(),
      ownerId: props.ownerId,
    });
  }
}
