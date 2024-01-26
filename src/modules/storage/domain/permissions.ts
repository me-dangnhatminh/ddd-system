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
