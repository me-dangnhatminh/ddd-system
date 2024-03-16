import { v4 as uuid } from 'uuid';
import { User } from './user';
import { IAdmin, IDataEditProfile, IDataRegisterUser } from './user.abstract';
import { UserRole } from './user-role';
import { AuthProvider } from './auth-provider';
import { UserEmail } from './user-email';
import { UserPassword } from './user-password';
import { Username } from './username';

export class Admin extends User implements IAdmin {
  signUpAdmin(data: IDataRegisterUser): Admin {
    const admin = new User(
      uuid(),
      Username.new(data.username),
      UserEmail.new(data.email),
      UserPassword.new(data.password, true),
      UserRole.ADMIN,
      data.authProvider ?? AuthProvider.LOCAL,
      data.isVerified ?? false,
      data.name ?? '',
      data.avatarUrl ?? '',
      new Date(),
    );
    if (!admin.isAdmin())
      throw new Error(`InvalidOperation: user is not an admin`);
    return admin;
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
