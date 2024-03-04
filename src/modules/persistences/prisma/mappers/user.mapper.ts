import * as ORM from '@prisma/client';
import * as Domain from '@modules/auth';

export class UserMapper {
  public static toDomain(orm: ORM.User): Domain.User {
    const name = Domain.UserName.new(orm.firstName, orm.lastName);
    const email = Domain.UserEmail.new(orm.email);
    const password = Domain.UserPassword.new(orm.password, true);
    return new Domain.User(
      orm.id,
      name,
      email,
      password,
      orm.role as Domain.UserRole,
      orm.isVerified,
      orm.avatarUrl,
      orm.authProvider as Domain.AuthProvider,
      orm.registeredAt,
    );
  }
  public static toOrm(domain: Domain.User): ORM.User {
    return {
      id: domain.id,
      firstName: domain.username.firstName,
      lastName: domain.username.lastName,
      email: domain.email.value,
      password: domain.password.value,
      role: domain.role as ORM.UserRole,
      isVerified: domain.isVerified,
      avatarUrl: domain.avatarUrl,
      authProvider: domain.authProvider,
      registeredAt: domain.registeredAt,
      updatedAt: null,
      removedAt: null,
    };
  }
}
