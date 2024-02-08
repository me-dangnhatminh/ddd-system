import * as ORM from '@prisma/client';
import * as Domain from '@modules/auth';

export class UserMapper {
  public static toDomain(orm: ORM.User): Domain.User {
    const nameResult = Domain.UserName.create(orm.firstName, orm.lastName);
    const passwordResult = Domain.UserPassword.create(orm.password);
    const emailResult = Domain.UserEmail.create(orm.email);
    if (nameResult._tag === 'Left') throw new Error(nameResult.left.message);
    if (passwordResult._tag === 'Left')
      throw new Error(passwordResult.left.message);
    if (emailResult._tag === 'Left') throw new Error(emailResult.left.message);

    return Domain.User.new({
      id: orm.id,
      name: nameResult.right,
      email: emailResult.right,
      password: passwordResult.right,
      role: orm.role as Domain.UserRole,
      avatarUrl: orm.avatarUrl,
      authProvider: orm.authProvider as Domain.AuthProvider,
      isVerified: orm.isVerified,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
      removedAt: orm.removedAt,
    });
  }
  public static toOrm(domain: Domain.User): ORM.User {
    return {
      id: domain.id,
      firstName: domain.firstName,
      lastName: domain.lastName,
      email: domain.email,
      password: domain.password,
      role: domain.role as unknown as ORM.UserRole,
      avatarUrl: domain.avatarUrl,
      authProvider: domain.authProvider,
      isVerified: domain.isVerified,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      removedAt: domain.removedAt,
    };
  }
}
