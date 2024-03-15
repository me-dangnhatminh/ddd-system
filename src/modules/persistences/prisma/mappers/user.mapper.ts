import * as ORM from '@prisma/client';
import * as Domain from '@modules/auth';

export class UserMapper {
  public static toDomain(orm: ORM.User): Domain.User {
    const name = orm.name;
    const email = Domain.UserEmail.new(orm.email);
    const password = Domain.UserPassword.new(orm.password, true);
    return new Domain.User(
      orm.id,
      name,
      email,
      password,
      orm.role as Domain.UserRole,
      orm.authProvider as Domain.AuthProvider,
      orm.isVerified,
      orm.avatarUrl,
      orm.registeredAt,
    );
  }
  public static toOrm(domain: Domain.User): ORM.User {
    return {
      id: domain.id,
      name: domain.name,
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
