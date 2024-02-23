import { User } from './user';

export const permissions = {
  registerAsAdmin: 'registerAsAdmin',
  resgister: 'resgister',
};

export type TPermissions = keyof typeof permissions;

export class Permisstion {
  private constructor(private readonly user: User) {}

  public static new = (user: User) => new Permisstion(user);

  public check(permission: TPermissions): boolean {
    switch (permission) {
      case 'registerAsAdmin':
        return this.user.isAdmin;
      case 'resgister':
        return true;
      default:
        return false;
    }
  }
}
