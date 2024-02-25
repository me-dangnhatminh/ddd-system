import { v4 as uuid } from 'uuid';
import { User } from './user';
import { IAdmin, IDataEditProfile, IDataRegisterUser } from './user.abstract';
import { UserRole } from './user-role';

export class Admin extends User implements IAdmin {
  registerAdmin(data: IDataRegisterUser): Admin {
    const user = new User(
      uuid(),
      data.username,
      data.email,
      data.password,
      UserRole.ADMIN,
      data.isVerified,
      data.avatarUrl,
      data.authProvider,
      new Date(),
    );
    if (!user.isAdmin())
      throw new Error(`InvalidOperation: user is not an admin`);
    return user;
  }

  editUser(user: User, data: IDataEditProfile): void {
    if (user.isAdmin())
      throw new Error('InvalidOperation: cannot edit an admin user');
    if (user.id === this.id) user.editProfile(data);
  }

  unregisterUser(): void {
    throw new Error('Method not implemented.');
  }
}
