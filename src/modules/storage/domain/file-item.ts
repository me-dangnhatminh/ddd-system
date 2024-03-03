import { Owner } from './owner';

export interface FileItemProps {
  id: string;
  owner: Owner;
  type: string;
  name: string;
  size: string;
  path: string;
  createdAt: Date;
  updatedAt: Date;
}

export class FileItem {
  get type() {
    return this.props.type;
  }
  get name() {
    return this.props.name;
  }
  get size() {
    return this.props.size;
  }
  get path() {
    return this.props.path;
  }

  constructor(protected props: FileItemProps) {}
}
