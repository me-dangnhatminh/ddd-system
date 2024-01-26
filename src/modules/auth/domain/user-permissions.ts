export class UserPermissions {
  constructor(
    public canUpdate: boolean,
    public canRemove: boolean,
    public canCreate: boolean,
  ) {}
}
