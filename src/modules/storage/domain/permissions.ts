export interface IPermissionsProps {
  canRead: boolean;
  canWrite: boolean;
  canDelete: boolean;
}

export interface ICreatePermissionsProps {
  canRead: boolean;
  canWrite: boolean;
  canDelete: boolean;
}

/**
 * The `Permissions` represents the access rights assigned to a user or a group.
 * It defines what actions they can perform on a resource such as a file or a folder.
 * For example, it can specify whether a user can read, write, or execute a file.
 */
export class Permissions {
  private constructor(private props: IPermissionsProps) {}
  static create(props?: ICreatePermissionsProps): Permissions {
    return new Permissions({
      canRead: props?.canRead ?? false,
      canWrite: props?.canWrite ?? false,
      canDelete: props?.canDelete ?? false,
    });
  }

  get canRead() {
    return this.props.canRead;
  }
  get canWrite() {
    return this.props.canWrite;
  }
  get canDelete() {
    return this.props.canDelete;
  }
}
