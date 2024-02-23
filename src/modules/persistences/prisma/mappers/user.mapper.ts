import * as ORM from '@prisma/client';
import * as Domain from '@modules/auth';

export class UserMapper {
  public static toDomain(orm: ORM.User): Domain.User {
    const name = Domain.UserName.new(orm.firstName, orm.lastName);
    const email = Domain.UserEmail.new(orm.email);
    const password = Domain.UserPassword.new(orm.password);

    return Domain.User.new({
      id: orm.id,
      name,
      email,
      password,
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
